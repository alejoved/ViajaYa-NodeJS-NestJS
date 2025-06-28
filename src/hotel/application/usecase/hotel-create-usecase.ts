import { Inject, Injectable, Logger } from "@nestjs/common";
import { HotelCreateUseCaseInterface } from "../port/hotel-create-usecase.interface";
import { HotelRepositoryInterface } from "../../../hotel/domain/repository/hotel-repository.interface";
import { HotelModel } from "../../domain/model/hotel-model";

@Injectable()
export class HotelCreateUseCase implements HotelCreateUseCaseInterface {

    private readonly logger = new Logger("HotelCreateUseCase");

    constructor(
        @Inject('HotelRepositoryInterface')
        private readonly hotelRepositoryInterface: HotelRepositoryInterface
      ) {}

    async execute(hotelModel: HotelModel): Promise<HotelModel>{
        return await this.hotelRepositoryInterface.create(hotelModel);
    }
}