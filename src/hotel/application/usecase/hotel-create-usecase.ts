import { Inject, Injectable, Logger } from "@nestjs/common";
import { HotelCreateUseCaseInterface } from "../port/hotel-create-usecase.interface";
import { HotelRepositoryInterface } from "../../../hotel/domain/repository/hotel-repository.interface";
import { Hotel } from "../../domain/model/hotel";

@Injectable()
export class HotelCreateUseCase implements HotelCreateUseCaseInterface {

    private readonly logger = new Logger("HotelCreateUseCase");

    constructor(
        @Inject('HotelRepositoryInterface')
        private readonly hotelRepositoryInterface: HotelRepositoryInterface
      ) {}

    async execute(hotel: Hotel): Promise<Hotel>{
        return await this.hotelRepositoryInterface.create(hotel);
    }
}