import { Flight } from "../../../flight/infrastructure/model/flight";

export interface FlightRepositoryInterface{
    get(): Promise<Flight[]>;
    getById(id: string): Promise<Flight | null>;
    getByOriginAndDestiny(origin: string, destiny: string): Promise<Flight[]>;
    create(flight: Flight): Promise<Flight>
    update(flight: Flight): Promise<Flight>
    delete(flight: Flight): Promise<void>
}