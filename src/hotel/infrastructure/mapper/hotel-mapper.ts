import { HotelModel } from "../../domain/model/hotel-model";
import { Hotel } from "../entity/hotel";

export class HotelMapper{

    static modelToEntity(hotelModel: HotelModel): Hotel {
        return {
            id : hotelModel.id,
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
}