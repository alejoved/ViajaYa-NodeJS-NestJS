import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReservationEntity } from "../entity/reservation-entity";
import { ReservationRepositoryInterface } from "../../../reservation/domain/repository/reservation-repository.interface";

@Injectable()
export class ReservationRepository implements ReservationRepositoryInterface {

    private readonly logger = new Logger("ReservationRepository");

    constructor(
        @InjectRepository(ReservationEntity)
        private readonly reservationRepository: Repository<ReservationEntity>,
      ) {}

    async get(): Promise<ReservationEntity[]>{
        return await this.reservationRepository.find({relations: ["customerEntity", "customerEntity.authEntity", "flightEntity", "hotelEntity"]});
    }

    async getById(id: string): Promise<ReservationEntity | null>{
        return await this.reservationRepository.findOneBy({id: id});
    }

    async getByIdAndCustomerAndFlightAndHotel(customerEmail:string, flightId: string, hotelId: string): Promise<ReservationEntity[]> {
        return await this.reservationRepository.find({where: {customerEntity: { authEntity: { email: customerEmail } },
                                                    flightEntity: {id: flightId},
                                                    hotelEntity: {id: hotelId}}
                                                });
    }

    async create(reservationEntity: ReservationEntity): Promise<ReservationEntity>{
        this.reservationRepository.create(reservationEntity);
        return await this.reservationRepository.save(reservationEntity);
    }

    async update(reservationEntity: ReservationEntity): Promise<ReservationEntity>{
        return await this.reservationRepository.save(reservationEntity);
    }

    async delete(reservationEntity: ReservationEntity): Promise<void>{
        await this.reservationRepository.delete(reservationEntity);
    }
}