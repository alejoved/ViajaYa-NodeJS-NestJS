import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { HotelGetUseCaseInterface } from "../interface/hotel-get-usecase.interface";
import { HotelRepositoryInterface } from "../../domain/repository/hotel-repository.interface";
import { HotelModel } from "../../domain/model/hotel-model";
import { Constants } from "../../../common/constants";
import { HotelMapper } from "../../adapter/mapper/hotel-mapper";

@Injectable()
export class HotelGetUseCase implements HotelGetUseCaseInterface {

    private readonly logger = new Logger("HotelGetUseCase");

    constructor(
        @Inject('HotelRepositoryInterface')
        private readonly hotelRepositoryInterface: HotelRepositoryInterface
      ) {}

    async execute(): Promise<HotelModel[]>{
        const hotelEntity = await this.hotelRepositoryInterface.get();
        const hotelModel = hotelEntity.map(HotelMapper.entityToModel);
        return hotelModel;
    }

    async executeById(id: string): Promise<HotelModel>{
        const hotelEntity = await this.hotelRepositoryInterface.getById(id);
        if (!hotelEntity){
            throw new NotFoundException(Constants.hotelNotFound);
        }
        const hotelModel = HotelMapper.entityToModel(hotelEntity);
        return hotelModel;
    }

    async executeByCountryAndCity(country: string, city: string): Promise<HotelModel[]>{
        const hotelEntity = await this.hotelRepositoryInterface.getByCountryAndCity(country, city);
        const hotelModel = hotelEntity.map(HotelMapper.entityToModel);
        return hotelModel;
    }
}