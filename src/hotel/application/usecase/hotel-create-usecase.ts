import { Inject, Injectable, Logger } from "@nestjs/common";
import { HotelCreateUseCaseInterface } from "../port/hotel-create-usecase.interface";
import { HotelRepositoryInterface } from "../../../hotel/domain/repository/hotel-repository.interface";
import { HotelCreateCommand } from "../command/hotel-create-command";
import { plainToInstance } from "class-transformer";
import { HotelModel } from "../../../hotel/domain/model/hotel-model";
import { Hotel } from "../../../hotel/infrastructure/model/hotel";

@Injectable()
export class HotelCreateUseCase implements HotelCreateUseCaseInterface {

    private readonly logger = new Logger("HotelCreateUseCase");

    constructor(
        @Inject('HotelRepositoryInterface')
        private readonly hotelRepositoryInterface: HotelRepositoryInterface
      ) {}

    async execute(hotelCreateCommand: HotelCreateCommand): Promise<HotelModel>{
        const hotel = plainToInstance(Hotel, hotelCreateCommand);
        await this.hotelRepositoryInterface.create(hotel);
        const hotelModel = plainToInstance(HotelModel, hotel)
        return hotelModel;
    }
}