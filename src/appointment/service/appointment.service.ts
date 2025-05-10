import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppointmentInterface } from "./appointment.interface";
import { Appointment } from "src/appointment/entity/appoinment.entity";
import { Auth } from "src/auth/entity/auth.entity";
import { AppointmentResponseDTO } from "../dto/appointment-response.dto";
import { plainToInstance } from "class-transformer";
import { Constants } from "src/utils/constants";
import { AppointmentDTO } from "../dto/appointment.dto";
import { Patient } from "src/patient/entity/patient.entity";
import { Physician } from "src/physician/entity/physician.entity";

@Injectable()
export class AppointmentService implements AppointmentInterface {

    private readonly logger = new Logger("AppointmentService");
    
    constructor(
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
        @InjectRepository(Physician)
        private readonly physicianRepository: Repository<Physician>,
        ) {}

    async getAll(): Promise<AppointmentResponseDTO[]> {
        const appointment = await this.appointmentRepository.find();
        const appointmentResponseDTO = plainToInstance(AppointmentResponseDTO, appointment, { excludeExtraneousValues: true })
        return appointmentResponseDTO;
    }
    async getById(id: string): Promise<AppointmentResponseDTO> {
        const appointment = await this.appointmentRepository.findOneBy({id: id});
        if(!appointment){
            throw new NotFoundException(Constants.appointmentNotFound)
        }
        const appointmentResponseDTO = plainToInstance(AppointmentResponseDTO, appointment, { excludeExtraneousValues: true })
        return appointmentResponseDTO;
    }
    async create(appointmentDTO: AppointmentDTO): Promise<AppointmentResponseDTO> {
        const patientExists = await this.patientRepository.findOne({where: { auth: {identification: appointmentDTO.patientIdentification}}});
        if(!patientExists){
            throw new NotFoundException(Constants.patientNotFound)
        }
        const physicianExists = await this.physicianRepository.findOne({where: { auth: {identification: appointmentDTO.physicianIdentification}}});
        if(!physicianExists){
            throw new NotFoundException(Constants.physicianNotFound)
        }
        //LOGICA DE NEGIO DEL APPOINTMENT

        const appointment = plainToInstance(Appointment, appointmentDTO, { excludeExtraneousValues: true });
        this.appointmentRepository.create(appointment);
        await this.appointmentRepository.save(appointment);
        const appointmentResponseDTO = plainToInstance(AppointmentResponseDTO, appointment, { excludeExtraneousValues: true })
        return appointmentResponseDTO;
    }
    async update(appointmentDTO: AppointmentDTO, id: string): Promise<AppointmentResponseDTO> {
        const appointmentExists = await this.appointmentRepository.findOneBy({id: id});
        if (!appointmentExists){
            throw new NotFoundException(Constants.appointmentNotFound);
        }
        const appointment = plainToInstance(Appointment, appointmentDTO, { excludeExtraneousValues: true })
        appointment.id = id;
        await this.appointmentRepository.save(appointmentDTO);
        const appointmentResponseDTO = plainToInstance(AppointmentResponseDTO, appointment, { excludeExtraneousValues: true })
        return appointmentResponseDTO;
    }
    async delete(id: string): Promise<void> {
        const appointmentExists = await this.appointmentRepository.findOneBy({id: id});
        if (!appointmentExists){
            throw new NotFoundException(Constants.appointmentNotFound);
        }
        await this.appointmentRepository.delete(appointmentExists);
    }
}