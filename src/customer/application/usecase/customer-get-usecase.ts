import { Inject, Injectable, Logger } from "@nestjs/common";
import { CustomerCreateUseCaseInterface } from "../port/customer-create-usecase.interface";
import { CustomerRepositoryInterface } from "../../../customer/domain/repository/customer-repository.interface";
import { CustomerCreateCommand } from "../command/customer-create-command";
import { hashSync } from "bcrypt";
import { plainToInstance } from "class-transformer";
import { Auth } from "src/auth/infrastructure/model/auth";
import { Role } from "src/common/role";
import { Customer } from "src/customer/infrastructure/model/customer";
import { CustomerModel } from "src/customer/domain/model/customer-model";
import { CustomerGetUseCaseInterface } from "../port/customer-get-usecase.interface";

@Injectable()
export class CustomerGetUseCase implements CustomerGetUseCaseInterface {

    private readonly logger = new Logger("AuthService");

    constructor(
        @Inject('CustomerRepositoryInterface')
        private readonly customerRepositoryInterface: CustomerRepositoryInterface
      ) {}

    async execute(): Promise<CustomerModel[]>{
        const customer = await this.customerRepositoryInterface.get();
        const customerModel = plainToInstance(CustomerModel, customer, { excludeExtraneousValues: true });
        return customerModel;
    }

    async executeById(id: string): Promise<CustomerModel>{
        const customer = await this.customerRepositoryInterface.getById(id);
        const customerModel = plainToInstance(CustomerModel, customer, { excludeExtraneousValues: true });
        return customerModel;
    }
    async executeByEmail(email: string): Promise<CustomerModel>{
        const customer = await this.customerRepositoryInterface.getByEmail(email)
        const customerModel = plainToInstance(CustomerModel, customer, { excludeExtraneousValues: true });
        return customerModel;
    }
}