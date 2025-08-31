import { FlightModel } from "../../domain/model/flight-model";
import { Flight } from "../../infrastructure/entity/flight";

export class FlightMapper{
    static modelToEntity(flightModel: FlightModel): Flight {
        return {
            id: flightModel.id,
            airline: flightModel.airline,
            origin: flightModel.origin,
            destiny :  flightModel.destiny,
            departure: flightModel.departure,
            layovers: flightModel.layovers,
            price: flightModel.price
        };
    }

    static entityToModel(flightEntity: Flight): FlightModel {
        return {
            id: flightEntity.id!,
            airline: flightEntity.airline,
            origin: flightEntity.origin,
            destiny :  flightEntity.destiny,
            departure: flightEntity.departure,
            layovers: flightEntity.layovers,
            price: flightEntity.price
        };
    }
}