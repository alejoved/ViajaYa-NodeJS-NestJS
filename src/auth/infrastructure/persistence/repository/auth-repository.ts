import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthRepositoryInterface } from "../../../domain/repository/auth-repository.interface";
import { Repository } from "typeorm";
import { AuthEntity } from "../entity/auth-entity";

@Injectable()
export class AuthRepository implements AuthRepositoryInterface {

    private readonly logger = new Logger("AuthService");

    constructor(
        @InjectRepository(AuthEntity)
        private readonly authRepository: Repository<AuthEntity>,
      ) {}

    async get(): Promise<AuthEntity[]>{
        return await this.authRepository.find();
    }

    async getByEmail(email: string): Promise<AuthEntity | null>{
        return await this.authRepository.findOneBy({email: email});
    }

    async create(authEntity: AuthEntity): Promise<AuthEntity>{
        this.authRepository.create(authEntity);
        return await this.authRepository.save(authEntity);
    }
}