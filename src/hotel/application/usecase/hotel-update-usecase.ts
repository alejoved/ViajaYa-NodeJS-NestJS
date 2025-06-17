import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { HotelUpdateUseCaseInterface } from "../port/hotel-update-usecase.interface";
import { Constants } from "../../../common/constants";
import { HotelRepositoryInterface } from "../../../hotel/domain/repository/hotel-repository.interface";
import { HotelModel } from "../../domain/model/hotel-model";
import { HotelMapper } from "../mapper/hotel-mapper";

@Injectable()
export class HotelUpdateUseCase implements HotelUpdateUseCaseInterface {

    private readonly logger = new Logger("HotelUpdateUseCase");

    constructor(
        @Inject('HotelRepositoryInterface')
        private readonly hotelRepositoryInterface: HotelRepositoryInterface
      ) {}

    async execute(hotelModel: HotelModel, id: string): Promise<HotelModel>{
        const hotelExists = await this.hotelRepositoryInterface.getById(id);
        if (!hotelExists){
            throw new NotFoundException(Constants.hotelNotFound);
        }
        const hotelEntity = HotelMapper.modelToEntity(hotelModel);
        hotelEntity.id = id;
        const response = await this.hotelRepositoryInterface.update(hotelEntity);
        return HotelMapper.entityToModel(response);
    }
}