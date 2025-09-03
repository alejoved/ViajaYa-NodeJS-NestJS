import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { HotelUpdateUseCaseInterface } from "../port/hotel-update-usecase.interface";
import { Constants } from "../../../common/constants";
import { HotelRepositoryInterface } from "../../domain/repository/hotel-repository.interface";
import { HotelUpdateDto } from "../dto/hotel-update-dto";
import { HotelResponseDto } from "../dto/hotel-response-dto";
import { HotelRestMapper } from "../mapper/hotel-rest-mapper";

@Injectable()
export class HotelUpdateUseCase implements HotelUpdateUseCaseInterface {

    private readonly logger = new Logger("HotelUpdateUseCase");

    constructor(
        @Inject('HotelRepositoryInterface')
        private readonly hotelRepositoryInterface: HotelRepositoryInterface
      ) {}

    async execute(hotelUpdateDto: HotelUpdateDto, id: string): Promise<HotelResponseDto>{
        const hotelExists = await this.hotelRepositoryInterface.getById(id);
        if (!hotelExists){
            throw new NotFoundException(Constants.hotelNotFound);
        }
        const hotel = HotelRestMapper.updateDtoToModel(hotelUpdateDto);
        Object.assign(hotelExists, hotel);
        const response = await this.hotelRepositoryInterface.update(hotelExists);
        const hotelResponseDto = HotelRestMapper.modelToDto(response);
        return hotelResponseDto;
    }
}