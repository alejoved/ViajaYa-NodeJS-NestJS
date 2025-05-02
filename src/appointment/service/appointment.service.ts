import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppointmentInterface } from "./appointment.interface";
import { Appointment } from "src/appointment/entity/appoinment.entity";

@Injectable()
export class AppointmentService implements AppointmentInterface {

    private readonly logger = new Logger("AppointmentService");

    constructor(
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,
      ) {}

    async getAll(){
        return await this.appointmentRepository.find();
    }
}