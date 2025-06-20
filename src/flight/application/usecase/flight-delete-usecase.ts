import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { FlightRepositoryInterface } from "../../domain/repository/flight-repository.interface";
import { FlightDeleteUseCaseInterface } from "../interface/flight-delete-usecase.interface";
import { Constants } from "../../../common/constants";

@Injectable()
export class FlightDeleteUseCase implements FlightDeleteUseCaseInterface {

    private readonly logger = new Logger("FlightDeleteUseCase");

    constructor(
        @Inject('FlightRepositoryInterface')
        private readonly flightRepositoryInterface: FlightRepositoryInterface
      ) {}

    async execute(id: string): Promise<void>{
        await this.flightRepositoryInterface.delete(id);
    }
}