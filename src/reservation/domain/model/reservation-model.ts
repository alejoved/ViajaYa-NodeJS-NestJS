import { CustomerModel } from "src/customer/domain/model/customer-model";
import { Status } from "../../../common/status";
import { FlightModel } from "../../../flight/domain/model/flight-model";
import { HotelModel } from "../../../hotel/domain/model/hotel-model";

export class ReservationModel {
    id: string;
    reservationDate: Date;
    status: Status;
    numberNights: number;
    total: number;
    customerModel: CustomerModel;
    flight: FlightModel;
    hotel: HotelModel;

}