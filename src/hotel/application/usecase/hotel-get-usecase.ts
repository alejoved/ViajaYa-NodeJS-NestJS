import { Inject, Injectable, Logger } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { HotelGetUseCaseInterface } from "../port/hotel-get-usecase.interface";
import { HotelRepositoryInterface } from "src/hotel/domain/repository/hotel-repository.interface";
import { HotelModel } from "src/hotel/domain/model/hotel-model";

@Injectable()
export class HotelGetUseCase implements HotelGetUseCaseInterface {

    private readonly logger = new Logger("HotelGetUseCase");

    constructor(
        @Inject('HotelRepositoryInterface')
        private readonly hotelRepositoryInterface: HotelRepositoryInterface
      ) {}

    async execute(): Promise<HotelModel[]>{
        const hotel = await this.hotelRepositoryInterface.get();
        const hotelModel = plainToInstance(HotelModel, hotel);
        return hotelModel;
    }

    async executeById(id: string): Promise<HotelModel>{
        const hotel = await this.hotelRepositoryInterface.getById(id);
        const hotelModel = plainToInstance(HotelModel, hotel);
        return hotelModel;
    }

    async executeByCountryAndCity(country: string, city: string): Promise<HotelModel[]>{
        const hotel = await this.hotelRepositoryInterface.getByCountryAndCity(country, city);
        const hotelModel = plainToInstance(HotelModel, hotel);
        return hotelModel;
    }
}