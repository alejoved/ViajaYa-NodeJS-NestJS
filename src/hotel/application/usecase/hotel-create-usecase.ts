import { Inject, Injectable, Logger } from "@nestjs/common";
import { HotelCreateUseCaseInterface } from "../interface/hotel-create-usecase.interface";
import { HotelRepositoryInterface } from "../../../hotel/domain/repository/hotel-repository.interface";
import { HotelModel } from "../../domain/model/hotel-model";
import { HotelMapper } from "../../adapter/mapper/hotel-mapper";

@Injectable()
export class HotelCreateUseCase implements HotelCreateUseCaseInterface {

    private readonly logger = new Logger("HotelCreateUseCase");

    constructor(
        @Inject('HotelRepositoryInterface')
        private readonly hotelRepositoryInterface: HotelRepositoryInterface
      ) {}

    async execute(hotelModel: HotelModel): Promise<HotelModel>{
        const hotelEntity = HotelMapper.modelToEntity(hotelModel);
        const response = await this.hotelRepositoryInterface.create(hotelEntity);
        return HotelMapper.entityToModel(response);
    }
}