import { HotelResponseDTO } from "../../adapter/dto/hotel-response.dto";
import { HotelModel } from "../../domain/model/hotel-model";
import { Hotel } from "../../infrastructure/entity/hotel";
import { HotelDTO } from "../../adapter/dto/hotel.dto";

export class HotelMapper{
    static dtoToModel(hotelDTO: HotelDTO): HotelModel {
        return {
            name: hotelDTO.name,
            country: hotelDTO.country,
            city: hotelDTO.city,
            category: hotelDTO.category,
            pricePerNight: hotelDTO.pricePerNight
        };
    }

    static modelToEntity(hotelModel: HotelModel): Hotel {
        return {
            name: hotelModel.name,
            country: hotelModel.country,
            city: hotelModel.city,
            category: hotelModel.category,
            pricePerNight: hotelModel.pricePerNight
        };
    }

    static entityToModel(hotel: Hotel): HotelModel {
        return {
            id: hotel.id,
            name: hotel.name,
            country: hotel.country,
            city: hotel.city,
            category: hotel.category,
            pricePerNight: hotel.pricePerNight
        };
    }
    static modelToDto(hotelModel: HotelModel): HotelResponseDTO {
        return {
            id: hotelModel.id!,
            name: hotelModel.name,
            country: hotelModel.country,
            city: hotelModel.city,
            category: hotelModel.category,
            pricePerNight: hotelModel.pricePerNight
        };
    }
}