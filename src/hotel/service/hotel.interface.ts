import { ICRUD } from "src/common/ICRUD";
import { HotelDTO } from "../dto/hotel.dto";
import { HotelResponseDTO } from "../dto/hotel-response.dto";

export interface HotelInterface extends ICRUD<HotelDTO,  HotelResponseDTO>{
    getByCountryAndCity(country: string, city: string): Promise<HotelResponseDTO[]>
}