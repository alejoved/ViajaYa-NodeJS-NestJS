import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { HotelUpdateUseCaseInterface } from "../interface/hotel-update-usecase.interface";
import { Constants } from "../../../common/constants";
import { HotelRepositoryInterface } from "../../domain/repository/hotel-repository.interface";
import { HotelModel } from "../../domain/model/hotel-model";

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
        hotelModel.id = id;
        return await this.hotelRepositoryInterface.update(hotelModel);
    }
}