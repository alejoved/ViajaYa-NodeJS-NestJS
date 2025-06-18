import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { HotelGetUseCaseInterface } from "../interface/hotel-get-usecase.interface";
import { HotelRepositoryInterface } from "../../domain/repository/hotel-repository.interface";
import { HotelModel } from "../../domain/model/hotel-model";
import { Constants } from "../../../common/constants";

@Injectable()
export class HotelGetUseCase implements HotelGetUseCaseInterface {

    private readonly logger = new Logger("HotelGetUseCase");

    constructor(
        @Inject('HotelRepositoryInterface')
        private readonly hotelRepositoryInterface: HotelRepositoryInterface
      ) {}

    async execute(): Promise<HotelModel[]>{
        const hotelModel = await this.hotelRepositoryInterface.get();
        return hotelModel;
    }

    async executeById(id: string): Promise<HotelModel>{
        const hotelModel = await this.hotelRepositoryInterface.getById(id);
        if(!hotelModel){
            throw new NotFoundException(Constants.hotelNotFound);
        }
        return hotelModel;
    }

    async executeByCountryAndCity(country: string, city: string): Promise<HotelModel[]>{
        const hotelModel = await this.hotelRepositoryInterface.getByCountryAndCity(country, city);
        return hotelModel;
    }
}