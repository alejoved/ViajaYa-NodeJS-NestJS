import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FlightInterface } from "./flight.interface";
import { Flight } from "../entity/flight.entity";
import { FlightResponseDTO } from "../dto/fligth-response.dto";
import { FlightDTO } from "../dto/fligth.dto";
import { plainToInstance } from "class-transformer";
import { Constants } from "src/common/constants";

@Injectable()
export class FlightService implements FlightInterface {

    private readonly logger = new Logger("FlightService");

    constructor(
        @InjectRepository(Flight)
        private readonly flightRepository: Repository<Flight>
      ) {}

    async getAll(): Promise<FlightResponseDTO[]> {
        const flights = await this.flightRepository.find();
        const flightResponseDTO = plainToInstance(FlightResponseDTO, flights, { excludeExtraneousValues: true })
        return flightResponseDTO;
    }
    async getById(id: string): Promise<FlightResponseDTO> {
        const flight = await this.flightRepository.findOne({where: { id: id }});
        if(!flight){
            throw new NotFoundException(Constants.flightNotFound)
        }
        const flightResponseDTO = plainToInstance(FlightResponseDTO, flight, { excludeExtraneousValues: true })
        return flightResponseDTO;
    }
    async getByOriginAndDestiny(origin: string, destiny: string): Promise<FlightResponseDTO[]> {
        const flights = await this.flightRepository.find({where: { origin: origin, destiny: destiny}});
        const flightResponseDTO = plainToInstance(FlightResponseDTO, flights, { excludeExtraneousValues: true })
        return flightResponseDTO;
    }
    async create(flightDTO: FlightDTO): Promise<FlightResponseDTO> {
        const flight = plainToInstance(Flight, flightDTO, { excludeExtraneousValues: true });
        this.flightRepository.create(flight);
        await this.flightRepository.save(flight);
        const flightResponseDTO = plainToInstance(FlightResponseDTO, flight, { excludeExtraneousValues: true })
        return flightResponseDTO;
    }
    async update(flightDTO: FlightDTO, id: string): Promise<FlightResponseDTO> {
        const flightExists = await this.flightRepository.findOneBy({id: id});
        if (!flightExists){
            throw new NotFoundException(Constants.flightNotFound);
        }
        const flight = plainToInstance(Flight, flightDTO, { excludeExtraneousValues: true })
        flight.id = id;
        await this.flightRepository.save(flight);
        const flightResponseDTO = plainToInstance(FlightResponseDTO, flight, { excludeExtraneousValues: true })
        return flightResponseDTO;
    }
    async delete(id: string): Promise<void> {
        const flightExists = await this.flightRepository.findOneBy({id: id});
        if (!flightExists){
            throw new NotFoundException(Constants.flightNotFound);
        }
        await this.flightRepository.delete(flightExists);
    }
}