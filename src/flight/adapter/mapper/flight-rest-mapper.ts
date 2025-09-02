import { Flight } from "../../domain/model/flight";
import { FlightDto } from "../dto/fligth-dto";
import { FlightResponseDto } from "../dto/fligth-response-dto";

export class FlightRestMapper{
    static dtoToModel(flightDTO: FlightDto): Flight {
        return {
            airline: flightDTO.airline,
            origin: flightDTO.origin,
            destiny :  flightDTO.destiny,
            departure: flightDTO.departure,
            layovers: flightDTO.layovers,
            price: flightDTO.price
        };
    }
    static modelToDto(flightModel: Flight): FlightResponseDto {
        return {
            id: flightModel.id!,
            airline: flightModel.airline,
            origin: flightModel.origin,
            destiny :  flightModel.destiny,
            departure: flightModel.departure,
            layovers: flightModel.layovers,
            price: flightModel.price
        };
    }
}