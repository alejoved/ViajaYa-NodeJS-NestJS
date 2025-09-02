import { HotelResponseDTO } from "../../adapter/dto/hotel-response.dto";
import { Hotel } from "../../domain/model/hotel";
import { HotelEntity } from "../../infrastructure/entity/hotel-entity";
import { HotelDTO } from "../../adapter/dto/hotel.dto";

export class HotelMapper{
    static dtoToModel(hotelDTO: HotelDTO): HotelEntity {
        return {
            name: hotelDTO.name,
            country: hotelDTO.country,
            city: hotelDTO.city,
            category: hotelDTO.category,
            pricePerNight: hotelDTO.pricePerNight
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
    static modelToDto(hotel: Hotel): HotelResponseDTO {
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