import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReservationEntity } from "../entity/reservation-entity";
import { ReservationRepositoryInterface } from "../../domain/repository/reservation-repository.interface";
import { ReservationMapper } from "../mapper/reservation-mapper";
import { Reservation } from "../../domain/model/reservation";
import { Constants } from "src/common/constants";

@Injectable()
export class ReservationRepository implements ReservationRepositoryInterface {

    private readonly logger = new Logger("ReservationRepository");

    constructor(
        @InjectRepository(ReservationEntity)
        private readonly reservationRepository: Repository<ReservationEntity>,
      ) {}

    async get(): Promise<Reservation[]>{
        const reservation = await this.reservationRepository.find({relations: ["customerEntity", "customerEntity.authEntity", "flightEntity", "hotelEntity"]});
        return reservation.map(ReservationMapper.entityToModel);
    }

    async getById(id: string): Promise<Reservation | null>{
        const reservation = await this.reservationRepository.findOneBy({id: id});
        if(!reservation){
            throw new NotFoundException(Constants.reservationNotFound);
        }
        return ReservationMapper.entityToModel(reservation);
    }

    async getByIdAndCustomerAndFlightAndHotel(customerEmail:string, flightId: string, hotelId: string): Promise<Reservation[]> {
        const reservation =  await this.reservationRepository.find({where: {customerEntity: { authEntity: { email: customerEmail } },
                                                    flightEntity: {id: flightId},
                                                    hotelEntity: {id: hotelId}}
                                                });
        return reservation.map(ReservationMapper.entityToModel);
    }

    async create(reservation: Reservation): Promise<Reservation>{
        const reservationEntity = ReservationMapper.modelToEntity(reservation);
        this.reservationRepository.create(reservationEntity);
        const response = await this.reservationRepository.save(reservationEntity);
        return ReservationMapper.entityToModel(response);
    }

    async update(reservation: Reservation): Promise<Reservation>{
        const reservationEntity = ReservationMapper.modelToEntity(reservation);
        const response = await this.reservationRepository.save(reservationEntity);
        return ReservationMapper.entityToModel(response);
    }

    async delete(id: string): Promise<void>{
        const reservationEntity = await this.reservationRepository.findOneBy({id: id});
        if (!reservationEntity){
            throw new NotFoundException(Constants.reservationNotFound);
        }
        await this.reservationRepository.delete(reservationEntity);
    }
}