import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Reservation } from "../model/reservation";
import { ReservationRepositoryInterface } from "../../../reservation/domain/repository/reservation-repository.interface";

@Injectable()
export class ReservationRepository implements ReservationRepositoryInterface {

    private readonly logger = new Logger("ReservationRepository");

    constructor(
        @InjectRepository(Reservation)
        private readonly reservationRepository: Repository<Reservation>,
      ) {}

    async get(): Promise<Reservation[]>{
        return await this.reservationRepository.find();
    }

    async getById(id: string): Promise<Reservation | null>{
        return await this.reservationRepository.findOneBy({id: id});
    }

    async create(reservation: Reservation): Promise<Reservation>{
        this.reservationRepository.create(reservation);
        return await this.reservationRepository.save(reservation);
    }

    async update(reservation: Reservation): Promise<Reservation>{
        return await this.reservationRepository.save(reservation);
    }

    async delete(reservation: Reservation): Promise<void>{
        await this.reservationRepository.delete(reservation);
    }
}