import { Inject, Injectable, Logger } from "@nestjs/common";
import { HotelCreateUseCaseInterface } from "../port/hotel-create-usecase.interface";
import { HotelRepositoryInterface } from "../../../hotel/domain/repository/hotel-repository.interface";
import { HotelCreateDto } from "../dto/hotel-create-dto";
import { HotelResponseDto } from "../dto/hotel-response-dto";
import { HotelRestMapper } from "../mapper/hotel-rest-mapper";

@Injectable()
export class HotelCreateUseCase implements HotelCreateUseCaseInterface {

    private readonly logger = new Logger("HotelCreateUseCase");

    constructor(
        @Inject('HotelRepositoryInterface')
        private readonly hotelRepositoryInterface: HotelRepositoryInterface
      ) {}

    async execute(hotelCreateDto: HotelCreateDto): Promise<HotelResponseDto>{
        const hotel = HotelRestMapper.createDtoToModel(hotelCreateDto);
        const response = await this.hotelRepositoryInterface.create(hotel);
        const hotelResponseDto = HotelRestMapper.modelToDto(response);
        return hotelResponseDto;
    }
}