import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthRepositoryInterface } from "../../domain/repository/auth-repository.interface";
import { Repository } from "typeorm";
import { Auth } from "../model/auth";

@Injectable()
export class AuthRepository implements AuthRepositoryInterface {

    private readonly logger = new Logger("AuthService");

    constructor(
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
      ) {}

    async get(): Promise<Auth[]>{
        return await this.authRepository.find();
    }

    async getByEmail(email: string): Promise<Auth | null>{
        return await this.authRepository.findOneBy({email: email});
    }

    async create(auth: Auth): Promise<Auth>{
        this.authRepository.create(auth);
        return await this.authRepository.save(auth);
    }
}