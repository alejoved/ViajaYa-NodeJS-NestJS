import { Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PatientInterface } from "./patient.interface";
import { Patient } from "../entity/patient.entity";
import { PatientDTO } from "../dto/patient.dto";
import { PatientResponseDTO } from "../dto/patient-response.dto";
import { plainToInstance } from "class-transformer";
import { Constants } from "src/utils/constants";
import { Role } from "src/utils/role";
import { Auth } from "src/auth/entity/auth.entity";

@Injectable()
export class PatientService implements PatientInterface {

    private readonly logger = new Logger("PatientService");

    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
      ) {}

    async getAll(): Promise<PatientResponseDTO[]> {
        const patients = await this.patientRepository.find();
        const patientResponseDTO = plainToInstance(PatientResponseDTO, patients, { excludeExtraneousValues: true })
        return patientResponseDTO;
    }
    async getById(id: string): Promise<PatientResponseDTO> {
        const patient = await this.patientRepository.findOneBy({id: id});
        if(!patient){
            throw new NotFoundException(Constants.patientNotFound)
        }
        const patientResponseDTO = plainToInstance(PatientResponseDTO, patient, { excludeExtraneousValues: true })
        return patientResponseDTO;
    }
    async create(patientDTO: PatientDTO): Promise<PatientResponseDTO> {
        const auth = plainToInstance(Auth, patientDTO, { excludeExtraneousValues: true });
        auth.role = Role.PATIENT;
        const patient = plainToInstance(Patient, patientDTO, { excludeExtraneousValues: true });
        this.authRepository.create(auth);
        patient.auth = auth;
        this.patientRepository.create(patient);
        await this.patientRepository.save(patient);
        const patientResponseDTO = plainToInstance(PatientResponseDTO, patient, { excludeExtraneousValues: true })
        return patientResponseDTO;
    }
    async update(patientDTO: PatientDTO, id: string): Promise<PatientResponseDTO> {
        const patientExists = await this.patientRepository.findOneBy({id: id});
        if (!patientExists){
            throw new NotFoundException(Constants.patientNotFound);
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
            throw new NotFoundException(Constants.patientNotFound);
        }
        await this.patientRepository.delete(physicianExists);
    }
}