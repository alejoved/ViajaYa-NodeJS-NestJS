import { Inject, Injectable, Logger } from "@nestjs/common";
import { FlightCreateUseCaseInterface } from "../port/flight-create-usecase.interface";
import { FlightRepositoryInterface } from "../../../flight/domain/repository/flight-repository.interface";
import { FlightCreateCommand } from "../command/flight-create-command";
import { hashSync } from "bcrypt";
import { plainToInstance } from "class-transformer";
import { Auth } from "src/auth/infrastructure/model/auth";
import { Role } from "src/common/role";
import { Customer } from "src/customer/infrastructure/model/customer";
import { CustomerModel } from "src/customer/domain/model/customer-model";

@Injectable()
export class FlightCreateUseCase implements FlightCreateUseCaseInterface {

    private readonly logger = new Logger("FlightCreateUseCase");

    constructor(
        @Inject('FlightRepositoryInterface')
        private readonly flightRepositoryInterface: FlightRepositoryInterface
      ) {}

    async execute(flightCreateCommand: FlightCreateCommand): Promise<FlightModel>{
        const flight = plainToInstance(Flight, flightCreateCommand, { excludeExtraneousValues: true });
        await this.flightRepositoryInterface.create(flight);
        const flightModel = plainToInstance(FlightModel, flight, { excludeExtraneousValues: true })
        return flightModel;
    }
}