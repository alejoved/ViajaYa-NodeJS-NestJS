import { Flight } from "../model/flight";

export interface FlightRepositoryInterface{
    get(): Promise<Flight[]>;
    getById(id: string): Promise<Flight>;
    getByOriginAndDestiny(origin: string, destiny: string): Promise<Flight[]>;
    create(flight: Flight): Promise<Flight>
    update(flight: Flight): Promise<Flight>
    delete(id: string): Promise<void>
}