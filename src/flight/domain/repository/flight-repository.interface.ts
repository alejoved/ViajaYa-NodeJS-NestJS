import { FlightModel } from "../model/flight-model";

export interface FlightRepositoryInterface{
    get(): Promise<FlightModel[]>;
    getById(id: string): Promise<FlightModel>;
    getByOriginAndDestiny(origin: string, destiny: string): Promise<FlightModel[]>;
    create(flightModel: FlightModel): Promise<FlightModel>
    update(flightModel: FlightModel): Promise<FlightModel>
    delete(id: string): Promise<void>
}