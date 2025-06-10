import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CustomerCreateUseCaseInterface } from "../port/customer-create-usecase.interface";
import { CustomerRepositoryInterface } from "../../../customer/domain/repository/customer-repository.interface";
import { CustomerCreateCommand } from "../command/customer-create-command";
import { hashSync } from "bcrypt";
import { plainToInstance } from "class-transformer";
import { Auth } from "src/auth/infrastructure/model/auth";
import { Role } from "src/common/role";
import { Customer } from "src/customer/infrastructure/model/customer";
import { CustomerModel } from "src/customer/domain/model/customer-model";
import { CustomerDeleteUseCaseInterface } from "../port/customer-delete-usecase.interface";
import { Constants } from "src/common/constants";

@Injectable()
export class CustomerDeleteUseCase implements CustomerDeleteUseCaseInterface {

    private readonly logger = new Logger("AuthService");

    constructor(
        @Inject('CustomerRepositoryInterface')
        private readonly customerRepositoryInterface: CustomerRepositoryInterface
      ) {}

    async execute(id: string): Promise<void>{
        const customer = await this.customerRepositoryInterface.getById(id);
        if (!customer){
            throw new NotFoundException(Constants.customerNotFound);
        }
        await this.customerRepositoryInterface.delete(customer);
    }
}