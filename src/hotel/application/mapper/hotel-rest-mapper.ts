import { HotelResponseDto } from "../../application/dto/hotel-response-dto";
import { Hotel } from "../../domain/model/hotel";
import { HotelCreateDto } from "../../application/dto/hotel-create-dto";
import { HotelUpdateDto } from "../../application/dto/hotel-update-dto";

export class HotelRestMapper{
    static createDtoToModel(hotelCreateDto: HotelCreateDto): Hotel {
        return {
            name: hotelCreateDto.name,
            country: hotelCreateDto.country,
            city: hotelCreateDto.city,
            category: hotelCreateDto.category,
            pricePerNight: hotelCreateDto.pricePerNight
        };
    }
    static updateDtoToModel(hotelUpdateDto: HotelUpdateDto): Hotel {
        return {
            name: hotelUpdateDto.name,
            country: hotelUpdateDto.country,
            city: hotelUpdateDto.city,
            category: hotelUpdateDto.category,
            pricePerNight: hotelUpdateDto.pricePerNight
        };
    }
    static modelToDto(hotel: Hotel): HotelResponseDto {
        return {
            id: hotel.id!,
            name: hotel.name,
            country: hotel.country,
            city: hotel.city,
            category: hotel.category,
            pricePerNight: hotel.pricePerNight
        };
    }
}