import { FlightModel } from "../../domain/model/flight-model";
import { FlightDTO } from "../../adapter/dto/fligth-dto";
import { FlightResponseDTO } from "../../adapter/dto/fligth-response-dto";

export class FlightMapper{
    static dtoToModel(flightDTO: FlightDTO): FlightModel {
        return {
            airline: flightDTO.airline,
            origin: flightDTO.origin,
            destiny :  flightDTO.destiny,
            departure: flightDTO.departure,
            layovers: flightDTO.layovers,
            price: flightDTO.price
        };
    }
    static modelToDto(flightModel: FlightModel): FlightResponseDTO {
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