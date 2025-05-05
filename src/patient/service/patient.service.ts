import { Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PatientInterface } from "./patient.interface";
import { Patient } from "../entity/patient.entity";
import { PatientDTO } from "../dto/patient.dto";
import { PatientResponseDTO } from "../dto/patient-response.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class PatientService implements PatientInterface {

    private readonly logger = new Logger("PatientService");

    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
      ) {}

    async getAll(): Promise<PatientResponseDTO[]> {
        const patients = await this.patientRepository.find();
        const patientResponseDTO = plainToInstance(PatientResponseDTO, patients, { excludeExtraneousValues: true })
        return patientResponseDTO;
    }
    async getById(id: string): Promise<PatientResponseDTO> {
        const patient = await this.patientRepository.findOneBy({id: id});
        const patientResponseDTO = plainToInstance(PatientResponseDTO, patient, { excludeExtraneousValues: true })
        return patientResponseDTO;
    }
    async create(patientDTO: PatientDTO): Promise<PatientResponseDTO> {
        this.patientRepository.create(patientDTO);
        const patient = await this.patientRepository.save(patientDTO);
        const patientResponseDTO = plainToInstance(PatientResponseDTO, patient, { excludeExtraneousValues: true })
        console.log(patientResponseDTO);
        return patientResponseDTO;
    }
    async update(patientDTO: PatientDTO, id: string): Promise<PatientResponseDTO> {
        const patientExists = await this.patientRepository.findOneBy({id: id});
        if (!patientExists){
            throw new NotFoundException();
        }
        const patient = plainToInstance(Patient, patientDTO, { excludeExtraneousValues: true })
        patient.id = id;
        await this.patientRepository.save(patientDTO);
        const physicianResponseDTO = plainToInstance(PatientResponseDTO, patient, { excludeExtraneousValues: true })
        return physicianResponseDTO;
    }
    async delete(id: string): Promise<void> {
        const physicianExists = await this.patientRepository.findOneBy({id: id});
        if (!physicianExists){
            throw new NotFoundException();
        }
        await this.patientRepository.delete(physicianExists);
    }
}