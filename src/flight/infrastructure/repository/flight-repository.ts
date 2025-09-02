import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FlightRepositoryInterface } from "../../domain/repository/flight-repository.interface";
import { FlightEntity } from "../entity/flight-entity";
import { FlightMapper } from "../mapper/flight-mapper";
import { Flight } from "../../domain/model/flight";
import { Constants } from "../../../common/constants";

@Injectable()
export class FlightRepository implements FlightRepositoryInterface {

    private readonly logger = new Logger("FlightRepository");

    constructor(
        @InjectRepository(FlightEntity)
        private readonly flightRepository: Repository<FlightEntity>,
      ) {}

    async get(): Promise<Flight[]>{
        const flight = await this.flightRepository.find();
        return flight.map(FlightMapper.modelToEntity);
    }

    async getById(id: string): Promise<Flight>{
        const flight = await this.flightRepository.findOneBy({id: id});
        if(!flight){
            throw new NotFoundException(Constants.flightNotFound);
        }
        return FlightMapper.entityToModel(flight);
    }

    async getByOriginAndDestiny(origin: string, destiny: string): Promise<Flight[]>{
        const flight = await this.flightRepository.findBy({origin: origin, destiny: destiny});
        return flight.map(FlightMapper.entityToModel);
    }

    async create(flightModel: Flight): Promise<Flight>{
        const flight = FlightMapper.modelToEntity(flightModel);
        this.flightRepository.create(flight);
        const response = await this.flightRepository.save(flight);
        return FlightMapper.entityToModel(response);
    }

    async update(flight: Flight): Promise<Flight>{
        const flightEntity = FlightMapper.modelToEntity(flight);
        const response = await this.flightRepository.save(flightEntity);
        return FlightMapper.entityToModel(response);
    }

    async delete(id: string): Promise<void>{
        const flightEntity = await this.flightRepository.findOneBy({id:id});
        if(!flightEntity){
            throw new NotFoundException(Constants.flightNotFound);
        }
        await this.flightRepository.delete(flightEntity);
    }
}