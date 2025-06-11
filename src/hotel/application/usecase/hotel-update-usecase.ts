import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Hotel } from "../../../hotel/infrastructure/model/hotel";
import { HotelUpdateUseCaseInterface } from "../port/hotel-update-usecase.interface";
import { Constants } from "../../../common/constants";
import { HotelRepositoryInterface } from "../../../hotel/domain/repository/hotel-repository.interface";
import { HotelModel } from "../../../hotel/domain/model/hotel-model";
import { HotelUpdateCommand } from "../command/hotel-update-command";

@Injectable()
export class HotelUpdateUseCase implements HotelUpdateUseCaseInterface {

    private readonly logger = new Logger("HotelUpdateUseCase");

    constructor(
        @Inject('HotelRepositoryInterface')
        private readonly hotelRepositoryInterface: HotelRepositoryInterface
      ) {}

    async execute(hotelUpdateCommand: HotelUpdateCommand, id: string): Promise<HotelModel>{
        const hotelExists = await this.hotelRepositoryInterface.getById(id);
        if (!hotelExists){
            throw new NotFoundException(Constants.hotelNotFound);
        }
        const hotel = plainToInstance(Hotel, hotelUpdateCommand, { excludeExtraneousValues: true });
        hotel.id = id;
        await this.hotelRepositoryInterface.update(hotel);
        const hotelModel = plainToInstance(HotelModel, hotel, { excludeExtraneousValues: true })
        return hotelModel;
    }
}