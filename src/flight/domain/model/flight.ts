export class Flight {
    id?: string;
    airline: string;
    origin: string;
    destiny: string;
    departure: Date;
    layovers: boolean;
    price: number;
}