import { Customer } from "../../../customer/domain/model/customer";
import { Status } from "../../../common/status";
import { Flight } from "../../../flight/domain/model/flight";
import { Hotel } from "../../../hotel/domain/model/hotel";

export class Reservation {
    id?: string;
    reservationDate?: Date;
    status?: Status;
    numberNights: number;
    total? : number;
    customerId?: string;
    customer?: Customer;
    flightId?: string
    flight?: Flight;
    hotelId?: string;
    hotel?: Hotel;
}