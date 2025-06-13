import { Inject, Injectable, Logger } from "@nestjs/common";
import { CustomerRepositoryInterface } from "../../../customer/domain/repository/customer-repository.interface";
import { plainToInstance } from "class-transformer";
import { Customer } from "../../../customer/infrastructure/model/customer";
import { CustomerModel } from "../../../customer/domain/model/customer-model";
import { CustomerUpdateUseCaseInterface } from "../port/customer-update-usecase.interface";
import { CustomerUpdateCommand } from "../command/customer-update-command";

@Injectable()
export class CustomerUpdateUseCase implements CustomerUpdateUseCaseInterface {

    private readonly logger = new Logger("CustomerUpdateUseCase");

    constructor(
        @Inject('CustomerRepositoryInterface')
        private readonly customerRepositoryInterface: CustomerRepositoryInterface
      ) {}

    async execute(customerUpdateCommand: CustomerUpdateCommand): Promise<CustomerModel>{
        const customer = plainToInstance(Customer, customerUpdateCommand);
        await this.customerRepositoryInterface.update(customer);
        const customerModel = plainToInstance(CustomerModel, customer)
        return customerModel;
    }
}