import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { HotelDeleteUseCaseInterface } from "../port/hotel-delete-usecase.interface";
import { HotelRepositoryInterface } from "../../../hotel/domain/repository/hotel-repository.interface";
import { Constants } from "src/common/constants";

@Injectable()
export class HotelDeleteUseCase implements HotelDeleteUseCaseInterface {

    private readonly logger = new Logger("HoteltDeleteUseCase");

    constructor(
        @Inject('HotelRepositoryInterface')
        private readonly hotelRepositoryInterface: HotelRepositoryInterface
      ) {}

    async execute(id: string): Promise<void>{
        const hotel = await this.hotelRepositoryInterface.getById(id);
        if (!hotel){
            throw new NotFoundException(Constants.hotelNotFound);
        }
        await this.hotelRepositoryInterface.delete(hotel);
    }
}