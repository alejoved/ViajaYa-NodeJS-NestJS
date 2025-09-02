import { Hotel } from "../../domain/model/hotel";
import { HotelEntity } from "../entity/hotel-entity";

export class HotelMapper{

    static modelToEntity(hotel: Hotel): HotelEntity {
        return {
            id : hotel.id,
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
}