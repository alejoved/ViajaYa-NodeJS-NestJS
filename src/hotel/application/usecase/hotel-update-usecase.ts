import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { HotelUpdateUseCaseInterface } from "../port/hotel-update-usecase.interface";
import { Constants } from "../../../common/constants";
import { HotelRepositoryInterface } from "../../domain/repository/hotel-repository.interface";
import { Hotel } from "../../domain/model/hotel";

@Injectable()
export class HotelUpdateUseCase implements HotelUpdateUseCaseInterface {

    private readonly logger = new Logger("HotelUpdateUseCase");

    constructor(
        @Inject('HotelRepositoryInterface')
        private readonly hotelRepositoryInterface: HotelRepositoryInterface
      ) {}

    async execute(hotel: Hotel, id: string): Promise<Hotel>{
        const hotelExists = await this.hotelRepositoryInterface.getById(id);
        if (!hotelExists){
            throw new NotFoundException(Constants.hotelNotFound);
        }
        Object.assign(hotelExists, hotel);
        return await this.hotelRepositoryInterface.update(hotelExists);
    }
}