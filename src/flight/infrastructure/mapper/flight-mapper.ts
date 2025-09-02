import { Flight } from "../../domain/model/flight";
import { FlightEntity } from "../entity/flight-entity";

export class FlightMapper{
    static modelToEntity(flight: Flight): Flight {
        return {
            id: flight.id,
            airline: flight.airline,
            origin: flight.origin,
            destiny :  flight.destiny,
            departure: flight.departure,
            layovers: flight.layovers,
            price: flight.price
        };
    }

    static entityToModel(flightEntity: FlightEntity): Flight {
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