import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FlightRepositoryInterface } from "../../domain/repository/flight-repository.interface";
import { Flight } from "../entity/flight";
import { FlightMapper } from "../mapper/flight-mapper";
import { FlightModel } from "../../domain/model/flight-model";
import { Constants } from "../../../common/constants";

@Injectable()
export class FlightRepository implements FlightRepositoryInterface {

    private readonly logger = new Logger("FlightRepository");

    constructor(
        @InjectRepository(Flight)
        private readonly flightRepository: Repository<Flight>,
      ) {}

    async get(): Promise<FlightModel[]>{
        const flight = await this.flightRepository.find();
        return flight.map(FlightMapper.modelToEntity);
    }

    async getById(id: string): Promise<FlightModel>{
        const flight = await this.flightRepository.findOneBy({id: id});
        if(!flight){
            throw new NotFoundException(Constants.flightNotFound);
        }
        return FlightMapper.entityToModel(flight);
    }

    async getByOriginAndDestiny(origin: string, destiny: string): Promise<FlightModel[]>{
        const flight = await this.flightRepository.findBy({origin: origin, destiny: destiny});
        return flight.map(FlightMapper.entityToModel);
    }

    async create(flightModel: FlightModel): Promise<FlightModel>{
        const flight = FlightMapper.modelToEntity(flightModel);
        this.flightRepository.create(flight);
        const response = await this.flightRepository.save(flight);
        return FlightMapper.entityToModel(response);
    }

    async update(flightModel: FlightModel): Promise<FlightModel>{
        const flight = FlightMapper.modelToEntity(flightModel);
        const response = await this.flightRepository.save(flight);
        return FlightMapper.entityToModel(response);
    }

    async delete(id: string): Promise<void>{
        const flight = await this.flightRepository.findOneBy({id:id});
        if(!flight){
            throw new NotFoundException(Constants.flightNotFound);
        }
        await this.flightRepository.delete(flight);
    }
}