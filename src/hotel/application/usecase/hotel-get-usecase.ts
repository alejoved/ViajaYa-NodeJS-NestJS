import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { HotelGetUseCaseInterface } from "../port/hotel-get-usecase.interface";
import { HotelRepositoryInterface } from "../../domain/repository/hotel-repository.interface";
import { Hotel } from "../../domain/model/hotel";
import { Constants } from "../../../common/constants";

@Injectable()
export class HotelGetUseCase implements HotelGetUseCaseInterface {

    private readonly logger = new Logger("HotelGetUseCase");

    constructor(
        @Inject('HotelRepositoryInterface')
        private readonly hotelRepositoryInterface: HotelRepositoryInterface
      ) {}

    async execute(): Promise<Hotel[]>{
        const hotel = await this.hotelRepositoryInterface.get();
        return hotel;
    }

    async executeById(id: string): Promise<Hotel>{
        const hotel = await this.hotelRepositoryInterface.getById(id);
        if(!hotel){
            throw new NotFoundException(Constants.hotelNotFound);
        }
        return hotel;
    }

    async executeByCountryAndCity(country: string, city: string): Promise<Hotel[]>{
        const hotelModel = await this.hotelRepositoryInterface.getByCountryAndCity(country, city);
        return hotelModel;
    }
}