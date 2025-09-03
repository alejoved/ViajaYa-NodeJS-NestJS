import { Flight } from "../../domain/model/flight";
import { FlightCreateDto } from "../../application/dto/fligth-create-dto";
import { FlightResponseDto } from "../../application/dto/fligth-response-dto";
import { FlightUpdateDto } from "../../application/dto/fligth-update-dto";

export class FlightRestMapper{
    static createDtoToModel(flightCreateDto: FlightCreateDto): Flight {
        return {
            airline: flightCreateDto.airline,
            origin: flightCreateDto.origin,
            destiny :  flightCreateDto.destiny,
            departure: flightCreateDto.departure,
            layovers: flightCreateDto.layovers,
            price: flightCreateDto.price
        };
    }
    static updateDtoToModel(flightUpdateDto: FlightUpdateDto): Flight {
        return {
            airline: flightUpdateDto.airline,
            origin: flightUpdateDto.origin,
            destiny :  flightUpdateDto.destiny,
            departure: flightUpdateDto.departure,
            layovers: flightUpdateDto.layovers,
            price: flightUpdateDto.price
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