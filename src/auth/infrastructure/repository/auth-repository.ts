import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthRepositoryInterface } from "../../domain/repository/auth-repository.interface";
import { Repository } from "typeorm";
import { AuthEntity } from "../entity/auth-entity";
import { Auth } from "../../domain/model/auth";
import { AuthMapper } from "../mapper/auth-mapper";
import { Constants } from "../../../common/constants";

@Injectable()
export class AuthRepository implements AuthRepositoryInterface {

    private readonly logger = new Logger("AuthRepository");

    constructor(
        @InjectRepository(AuthEntity)
        private readonly authRepository: Repository<AuthEntity>,
      ) {}

    async get(): Promise<Auth[]>{
        const auth = await this.authRepository.find();
        return auth.map(AuthMapper.entityToModel);
    }

    async getByEmail(email: string): Promise<Auth>{
        const auth = await this.authRepository.findOneBy({email: email});
        if(!auth){
            throw new NotFoundException(Constants.authNotFound);
        }
        return AuthMapper.entityToModel(auth);

    }

    async create(authModel: Auth): Promise<Auth>{
        const auth = AuthMapper.modelToEntity(authModel);
        this.authRepository.create(auth);
        const response = await this.authRepository.save(auth);
        return AuthMapper.entityToModel(response);
    }
}