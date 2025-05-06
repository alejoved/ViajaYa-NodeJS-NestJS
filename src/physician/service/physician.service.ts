import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PhysicianInterface } from "./physician.interface";
import { Physician } from "../entity/physician.entity";
import { PhysicianResponseDTO } from "../dto/physician-response.dto";
import { PhysicianDTO } from "../dto/physician.dto";
import { plainToInstance } from "class-transformer";
import { Constants } from "src/utils/constants";
import { Auth } from "src/auth/entity/auth.entity";
import { Role } from "src/utils/role";

@Injectable()
export class PhysicianService implements PhysicianInterface {

    private readonly logger = new Logger("PhysicianService");

    constructor(
        @InjectRepository(Physician)
        private readonly physicianRepository: Repository<Physician>,
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
      ) {}

    async getAll(): Promise<PhysicianResponseDTO[]> {
        const physicians = await this.physicianRepository.find();
        const physicianResponseDTO = plainToInstance(PhysicianResponseDTO, physicians, { excludeExtraneousValues: true })
        return physicianResponseDTO;
    }

    async getById(id: string): Promise<PhysicianResponseDTO> {
        const physician = await this.physicianRepository.findOneBy({id: id});
        if (!physician){
            throw new NotFoundException(Constants.physicianNotFound);
        }
        const physicianResponseDTO = plainToInstance(PhysicianResponseDTO, physician, { excludeExtraneousValues: true })
        return physicianResponseDTO;
    }

    async create(physicianDTO: PhysicianDTO): Promise<PhysicianResponseDTO> {
        const auth = plainToInstance(Auth, physicianDTO, { excludeExtraneousValues: true });
        auth.role = Role.PHYSICIAN;
        const physician = plainToInstance(Physician, physicianDTO, { excludeExtraneousValues: true });
        this.authRepository.create(auth);
        physician.auth = auth;
        this.physicianRepository.create(physician);
        await this.physicianRepository.save(physician);
        const physicianResponseDTO = plainToInstance(PhysicianResponseDTO, physician, { excludeExtraneousValues: true })
        return physicianResponseDTO;
    }

    async update(physicianDTO: PhysicianDTO, id: string): Promise<PhysicianResponseDTO> {
        const physicianExists = await this.physicianRepository.findOneBy({id: id});
        if (!physicianExists){
            throw new NotFoundException(Constants.physicianNotFound);
        }
        const physician = plainToInstance(Physician, physicianDTO, { excludeExtraneousValues: true })
        physician.id = id;
        await this.physicianRepository.save(physicianDTO);
        const physicianResponseDTO = plainToInstance(PhysicianResponseDTO, physician, { excludeExtraneousValues: true })
        return physicianResponseDTO;
    }

    async delete(id: string): Promise<void> {
        const physicianExists = await this.physicianRepository.findOneBy({id: id});
        if (!physicianExists){
            throw new NotFoundException(Constants.physicianNotFound);
        }
        await this.physicianRepository.delete(physicianExists);
    }

    
}