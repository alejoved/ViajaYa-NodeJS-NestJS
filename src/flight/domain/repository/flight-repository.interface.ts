import { FlightEntity } from "../../infrastructure/entity/flight-entity";

export interface FlightRepositoryInterface{
    get(): Promise<FlightEntity[]>;
    getById(id: string): Promise<FlightEntity | null>;
    getByOriginAndDestiny(origin: string, destiny: string): Promise<FlightEntity[]>;
    create(flightEntity: FlightEntity): Promise<FlightEntity>
    update(flightEntity: FlightEntity): Promise<FlightEntity>
    delete(flightEntity: FlightEntity): Promise<void>
}