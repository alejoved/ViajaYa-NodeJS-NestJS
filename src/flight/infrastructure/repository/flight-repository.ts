import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FlightRepositoryInterface } from "../../../flight/domain/repository/flight-repository.interface";
import { Flight } from "../model/flight";

@Injectable()
export class FlightRepository implements FlightRepositoryInterface {

    private readonly logger = new Logger("FlightRepository");

    constructor(
        @InjectRepository(Flight)
        private readonly flightRepository: Repository<Flight>,
      ) {}

    async get(): Promise<Flight[]>{
        return await this.flightRepository.find();
    }

    async getById(id: string): Promise<Flight | null>{
        return await this.flightRepository.findOneBy({id: id});
    }

    async getByOriginAndDestiny(origin: string, destiny: string): Promise<Flight[]>{
        return await this.flightRepository.findBy({origin: origin, destiny: destiny});
    }

    async create(flight: Flight): Promise<Flight>{
        this.flightRepository.create(flight);
        return await this.flightRepository.save(flight);
    }

    async update(flight: Flight): Promise<Flight>{
        return await this.flightRepository.save(flight);
    }

    async delete(flight: Flight): Promise<void>{
        await this.flightRepository.delete(flight);
    }
}