import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Reservation } from "../entity/reservation";
import { ReservationRepositoryInterface } from "../../domain/repository/reservation-repository.interface";
import { ReservationMapper } from "../mapper/reservation-mapper";
import { ReservationModel } from "../../domain/model/reservation-model";
import { Constants } from "src/common/constants";

@Injectable()
export class ReservationRepository implements ReservationRepositoryInterface {

    private readonly logger = new Logger("ReservationRepository");

    constructor(
        @InjectRepository(Reservation)
        private readonly reservationRepository: Repository<Reservation>,
      ) {}

    async get(): Promise<ReservationModel[]>{
        const reservation = await this.reservationRepository.find({relations: ["customer", "customer.auth", "flight", "hotel"]});
        return reservation.map(ReservationMapper.entityToModel);
    }

    async getById(id: string): Promise<ReservationModel | null>{
        const reservation = await this.reservationRepository.findOneBy({id: id});
        if(!reservation){
            throw new NotFoundException(Constants.reservationNotFound);
        }
        return ReservationMapper.entityToModel(reservation);
    }

    async getByIdAndCustomerAndFlightAndHotel(customerEmail:string, flightId: string, hotelId: string): Promise<ReservationModel[]> {
        const reservation =  await this.reservationRepository.find({where: {customer: { auth: { email: customerEmail } },
                                                    flight: {id: flightId},
                                                    hotel: {id: hotelId}}
                                                });
        return reservation.map(ReservationMapper.entityToModel);
    }

    async create(reservationModel: ReservationModel): Promise<ReservationModel>{
        const reservation = ReservationMapper.modelToEntity(reservationModel);
        this.reservationRepository.create(reservation);
        const response = await this.reservationRepository.save(reservation);
        return ReservationMapper.entityToModel(response);
    }

    async update(reservationModel: ReservationModel): Promise<ReservationModel>{
        const reservation = ReservationMapper.modelToEntity(reservationModel);
        const response = await this.reservationRepository.save(reservation);
        return ReservationMapper.entityToModel(response);
    }

    async delete(id: string): Promise<void>{
        const reservation = await this.reservationRepository.findOneBy({id: id});
        if (!reservation){
            throw new NotFoundException(Constants.reservationNotFound);
        }
        await this.reservationRepository.delete(reservation);
    }
}