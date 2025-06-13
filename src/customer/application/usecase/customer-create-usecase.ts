import { Inject, Injectable, Logger } from "@nestjs/common";
import { CustomerCreateUseCaseInterface } from "../port/customer-create-usecase.interface";
import { CustomerRepositoryInterface } from "../../../customer/domain/repository/customer-repository.interface";
import { CustomerCreateCommand } from "../command/customer-create-command";
import { hashSync } from "bcrypt";
import { plainToInstance } from "class-transformer";
import { Auth } from "../../../auth/infrastructure/model/auth";
import { Role } from "../../../common/role";
import { Customer } from "../../../customer/infrastructure/model/customer";
import { CustomerModel } from "../../../customer/domain/model/customer-model";

@Injectable()
export class CustomerCreateUseCase implements CustomerCreateUseCaseInterface {

    private readonly logger = new Logger("AuthService");

    constructor(
        @Inject('CustomerRepositoryInterface')
        private readonly customerRepositoryInterface: CustomerRepositoryInterface
      ) {}

    async execute(customerCreateCommand: CustomerCreateCommand): Promise<CustomerModel>{
        const password = hashSync(customerCreateCommand.password, 3); 
        const auth = plainToInstance(Auth, customerCreateCommand);
        auth.role = Role.CUSTOMER;
        auth.password = password;
        const customer = plainToInstance(Customer, customerCreateCommand);
        customer.auth = auth;
        await this.customerRepositoryInterface.create(customer);
        const customerModel = plainToInstance(CustomerModel, customer)
        return customerModel;
    }
}