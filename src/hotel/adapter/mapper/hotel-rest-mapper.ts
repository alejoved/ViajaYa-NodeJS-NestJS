import { HotelResponseDto } from "../dto/hotel-response.dto";
import { Hotel } from "../../domain/model/hotel";
import { HotelEntity } from "../../infrastructure/entity/hotel-entity";
import { HotelDto } from "../dto/hotel.dto";

export class HotelRestMapper{
    static dtoToModel(hotelDto: HotelDto): HotelEntity {
        return {
            name: hotelDto.name,
            country: hotelDto.country,
            city: hotelDto.city,
            category: hotelDto.category,
            pricePerNight: hotelDto.pricePerNight
        };
    }

    static modelToEntity(hotel: Hotel): HotelEntity {
        return {
            name: hotel.name,
            country: hotel.country,
            city: hotel.city,
            category: hotel.category,
            pricePerNight: hotel.pricePerNight
        };
    }

    static entityToModel(hotelEntity: HotelEntity): Hotel {
        return {
            id: hotelEntity.id,
            name: hotelEntity.name,
            country: hotelEntity.country,
            city: hotelEntity.city,
            category: hotelEntity.category,
            pricePerNight: hotelEntity.pricePerNight
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