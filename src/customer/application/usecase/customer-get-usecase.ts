import { Inject, Injectable, Logger } from "@nestjs/common";
import { CustomerRepositoryInterface } from "../../../customer/domain/repository/customer-repository.interface";
import { plainToInstance } from "class-transformer";
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