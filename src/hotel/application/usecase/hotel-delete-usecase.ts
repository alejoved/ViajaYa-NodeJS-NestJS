import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { HotelDeleteUseCaseInterface } from "../interface/hotel-delete-usecase.interface";
import { HotelRepositoryInterface } from "../../domain/repository/hotel-repository.interface";

@Injectable()
export class HotelDeleteUseCase implements HotelDeleteUseCaseInterface {

    private readonly logger = new Logger("HoteltDeleteUseCase");

    constructor(
        @Inject('HotelRepositoryInterface')
        private readonly hotelRepositoryInterface: HotelRepositoryInterface
      ) {}

    async execute(id: string): Promise<void>{
        await this.hotelRepositoryInterface.delete(id);
    }
}