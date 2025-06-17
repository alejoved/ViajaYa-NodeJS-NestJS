import { HotelResponseDTO } from "../../interface/rest/dto/hotel-response.dto";
import { HotelModel } from "../../domain/model/hotel-model";
import { HotelEntity } from "../../infrastructure/entity/hotel-entity";
import { HotelDTO } from "../../interface/rest/dto/hotel.dto";

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

    static modelToEntity(hotelModel: HotelModel): HotelEntity {
        return {
            name: hotelModel.name,
            country: hotelModel.country,
            city: hotelModel.city,
            category: hotelModel.category,
            pricePerNight: hotelModel.pricePerNight
        };
    }

    static entityToModel(hotelEntity: HotelEntity): HotelModel {
        return {
            id: hotelEntity.id,
            name: hotelEntity.name,
            country: hotelEntity.country,
            city: hotelEntity.city,
            category: hotelEntity.category,
            pricePerNight: hotelEntity.pricePerNight
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