import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { HotelGetUseCaseInterface } from "../port/hotel-get-usecase.interface";
import { HotelRepositoryInterface } from "../../domain/repository/hotel-repository.interface";
import { Constants } from "../../../common/constants";
import { HotelResponseDto } from "../dto/hotel-response-dto";
import { HotelRestMapper } from "../mapper/hotel-rest-mapper";

@Injectable()
export class HotelGetUseCase implements HotelGetUseCaseInterface {

    private readonly logger = new Logger("HotelGetUseCase");

    constructor(
        @Inject('HotelRepositoryInterface')
        private readonly hotelRepositoryInterface: HotelRepositoryInterface
      ) {}

    async execute(): Promise<HotelResponseDto[]>{
        const hotels = await this.hotelRepositoryInterface.get();
        const hotelResponseDto = hotels.map(HotelRestMapper.modelToDto)
        return hotelResponseDto;
    }

    async executeById(id: string): Promise<HotelResponseDto>{
        const hotel = await this.hotelRepositoryInterface.getById(id);
        if(!hotel){
            throw new NotFoundException(Constants.hotelNotFound);
        }
        const hotelResponseDto = HotelRestMapper.modelToDto(hotel);
        return hotelResponseDto
    }

    async executeByCountryAndCity(country: string, city: string): Promise<HotelResponseDto[]>{
        const hotels = await this.hotelRepositoryInterface.getByCountryAndCity(country, city);
        const hotelResponseDto = hotels.map(HotelRestMapper.modelToDto)
        return hotelResponseDto;
    }
}