export class FlightCreateCommand{
    airline: string;
    origin: string;
    destiny: string;
    departure: Date;
    layovers: boolean;
    price: number;
}