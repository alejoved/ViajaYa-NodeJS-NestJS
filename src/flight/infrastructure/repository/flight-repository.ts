import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FlightRepositoryInterface } from "../../domain/repository/flight-repository.interface";
import { FlightEntity } from "../entity/flight-entity";

@Injectable()
export class FlightRepository implements FlightRepositoryInterface {

    private readonly logger = new Logger("FlightRepository");

    constructor(
        @InjectRepository(FlightEntity)
        private readonly flightRepository: Repository<FlightEntity>,
      ) {}

    async get(): Promise<FlightEntity[]>{
        return await this.flightRepository.find();
    }

    async getById(id: string): Promise<FlightEntity | null>{
        return await this.flightRepository.findOneBy({id: id});
    }

    async getByOriginAndDestiny(origin: string, destiny: string): Promise<FlightEntity[]>{
        return await this.flightRepository.findBy({origin: origin, destiny: destiny});
    }

    async create(flightEntity: FlightEntity): Promise<FlightEntity>{
        this.flightRepository.create(flightEntity);
        return await this.flightRepository.save(flightEntity);
    }

    async update(flightEntity: FlightEntity): Promise<FlightEntity>{
        return await this.flightRepository.save(flightEntity);
    }

    async delete(flightEntity: FlightEntity): Promise<void>{
        await this.flightRepository.delete(flightEntity);
    }
}