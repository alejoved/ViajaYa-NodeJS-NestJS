import { ConflictException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReservationInterface } from "./reservation.interface";
import { ReservationResponseDTO } from "../dto/reservation-response.dto";
import { plainToInstance } from "class-transformer";
import { Constants } from "../../common/constants";
import { Reservation } from "../entity/reservation.entity";
import { ReservationDTO } from "../dto/reservation.dto";
import { Flight } from "../../flight/entity/flight.entity";
import { Hotel } from "../../hotel/entity/hotel.entity";
import { Customer } from "../../customer/entity/customer.entity";
import { Status } from "../../common/status";


@Injectable()
export class ReservationService implements ReservationInterface {

    private readonly logger = new Logger("ReservationService");
    
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
        @InjectRepository(Reservation)
        private readonly reservationRepository: Repository<Reservation>,
        @InjectRepository(Flight)
        private readonly flightRepository: Repository<Flight>,
        @InjectRepository(Hotel)
        private readonly hotelRepository: Repository<Hotel>,
        ) {}

    async getAll(): Promise<ReservationResponseDTO[]> {
        const reservations = await this.reservationRepository.find({relations: ['flight', 'hotel']});
        const reservationResponseDTO = plainToInstance(ReservationResponseDTO, reservations, { excludeExtraneousValues: true })
        return reservationResponseDTO;
    }
    async getById(id: string): Promise<ReservationResponseDTO> {
        const reservation = await this.reservationRepository.findOne({where: {id: id}, relations: ['flight', 'hotel']} );
        if(!reservation){
            throw new NotFoundException(Constants.reservationNotFound)
        }
        const reservationResponseDTO = plainToInstance(ReservationResponseDTO, reservation, { excludeExtraneousValues: true })
        return reservationResponseDTO;
    }
    async create(reservationDTO: ReservationDTO): Promise<ReservationResponseDTO> {
        const customerExists = await this.customerRepository.findOne({where: { auth: {email: reservationDTO.customerEmail}}});
        if(!customerExists){
            throw new NotFoundException(Constants.customerNotFound)
        }
        const flightExists = await this.flightRepository.findOne({where: {id: reservationDTO.flightId}});
        if(!flightExists){
            throw new NotFoundException(Constants.flightNotFound)
        }
        const hotelExists = await this.hotelRepository.findOne({where: {id: reservationDTO.hotelId}});
        if(!hotelExists){
            throw new NotFoundException(Constants.hotelNotFound)
        }
        const reservationExists = await this.reservationRepository.find({
            where: {
                customer: { auth: { email: reservationDTO.customerEmail } },
                flight: {id: reservationDTO.flightId},
                hotel: {id: reservationDTO.hotelId}}
            });
        if(reservationExists.length > 0){
            throw new ConflictException(Constants.reservationExists);
        }
        const total = hotelExists.pricePerNight * reservationDTO.numberNights;
        const reservation = plainToInstance(Reservation, reservationDTO, { excludeExtraneousValues: true });
        reservation.reservationDate = new Date();
        reservation.status = Status.PENDING;
        reservation.total = total;
        reservation.customer = customerExists;
        reservation.flight = flightExists;
        reservation.hotel = hotelExists;
        this.reservationRepository.create(reservation);
        await this.reservationRepository.save(reservation);
        const appointmentResponseDTO = plainToInstance(ReservationResponseDTO, reservation, { excludeExtraneousValues: true })
        return appointmentResponseDTO;
    }
    async update(reservationDTO: ReservationDTO, id: string): Promise<ReservationResponseDTO> {
        const reservationExists = await this.reservationRepository.findOneBy({id: id});
        if (!reservationExists){
            throw new NotFoundException(Constants.reservationNotFound);
        }
        const reservation = plainToInstance(Reservation, reservationDTO, { excludeExtraneousValues: true })
        reservation.id = id;
        await this.reservationRepository.save(reservation);
        const reservationResponseDTO = plainToInstance(ReservationResponseDTO, reservation, { excludeExtraneousValues: true })
        return reservationResponseDTO;
    }
    async delete(id: string): Promise<void> {
        const reservationExists = await this.reservationRepository.findOneBy({id: id});
        if (!reservationExists){
            throw new NotFoundException(Constants.reservationNotFound);
        }
        await this.reservationRepository.delete(reservationExists);
    }

    async confirm(id: string): Promise<void> {
        const reservationExists = await this.reservationRepository.findOneBy({id: id});
        if (!reservationExists){
            throw new NotFoundException(Constants.reservationNotFound);
        }
        if (reservationExists.status == Status.CANCELED){
            throw new ConflictException(Constants.reservationCanceled);
        }
        reservationExists.status = Status.CONFIRMED;
        await this.reservationRepository.save(reservationExists);
    }

    async cancel(id: string): Promise<void> {
        const reservationExists = await this.reservationRepository.findOneBy({id: id});
        if (!reservationExists){
            throw new NotFoundException(Constants.reservationNotFound);
        }
        if (reservationExists.status == Status.CONFIRMED){
            throw new ConflictException(Constants.reservationConfirmed);
        }
        reservationExists.status = Status.CANCELED;
        await this.reservationRepository.save(reservationExists);
    }
}