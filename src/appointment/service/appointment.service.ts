import { ConflictException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, MoreThan, Repository } from "typeorm";
import { AppointmentInterface } from "./appointment.interface";
import { Appointment } from "src/appointment/entity/appoinment.entity";
import { AppointmentResponseDTO } from "../dto/appointment-response.dto";
import { plainToInstance } from "class-transformer";
import { Constants } from "src/common/constants";
import { AppointmentDTO } from "../dto/appointment.dto";
import { Patient } from "src/patient/entity/patient.entity";
import { Physician } from "src/physician/entity/physician.entity";
import { addMinutes, format, parse } from "date-fns";

@Injectable()
export class AppointmentService implements AppointmentInterface {

    private readonly logger = new Logger("AppointmentService");
    
    constructor(
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
        @InjectRepository(Physician)
        private readonly physicianRepository: Repository<Physician>,
        ) {}

    async getAll(): Promise<AppointmentResponseDTO[]> {
        const appointment = await this.appointmentRepository.find({relations: ['patient', 'physician']});
        const appointmentResponseDTO = plainToInstance(AppointmentResponseDTO, appointment, { excludeExtraneousValues: true })
        return appointmentResponseDTO;
    }
    async getById(id: string): Promise<AppointmentResponseDTO> {
        const appointment = await this.appointmentRepository.findOne({where: {id: id}, relations: ['patient', 'physician']} );
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
        const startDate = new Date(appointmentDTO.startDate);
        console.log(startDate);
        const endDate = addMinutes(startDate, appointmentDTO.duration);
        console.log(endDate);
        const appointmentExists = await this.appointmentRepository.find({
            where: {
                physician: {
                auth: {
                    identification: appointmentDTO.physicianIdentification,
                },
                },
                startDate: LessThan(endDate),
                endDate: MoreThan(startDate),
            }
            });
        if(appointmentExists.length > 0){
            throw new ConflictException(Constants.appointmentExists);
        }
        const appointment = plainToInstance(Appointment, appointmentDTO, { excludeExtraneousValues: true });
        appointment.patient = patientExists;
        appointment.physician = physicianExists;
        appointment.endDate = endDate;
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