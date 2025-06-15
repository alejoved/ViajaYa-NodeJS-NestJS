import { Inject, Injectable, Logger } from "@nestjs/common";
import { CustomerRepositoryInterface } from "../../../customer/domain/repository/customer-repository.interface";
import { plainToInstance } from "class-transformer";
import { CustomerModel } from "../../../customer/domain/model/customer-model";
import { CustomerGetUseCaseInterface } from "../port/customer-get-usecase.interface";
import { CustomerMapper } from "../mapper/customer-mapper";

@Injectable()
export class CustomerGetUseCase implements CustomerGetUseCaseInterface {

    private readonly logger = new Logger("AuthService");

    constructor(
        @Inject('CustomerRepositoryInterface')
        private readonly customerRepositoryInterface: CustomerRepositoryInterface
      ) {}

    async execute(): Promise<CustomerModel[]>{
        const customerEntity = await this.customerRepositoryInterface.get();
        const customerModel = customerEntity.map(CustomerMapper.entityToModel);
        return customerModel;
    }

    async executeById(id: string): Promise<CustomerModel>{
        const customerEntity = await this.customerRepositoryInterface.getById(id);
        const customerModel = CustomerMapper.entityToModel(customerEntity);
        return customerModel;
    }
    async executeByEmail(email: string): Promise<CustomerModel>{
        const customerEntity = await this.customerRepositoryInterface.getByEmail(email)
        const customerModel = CustomerMapper.entityToModel(customerEntity);
        return customerModel;
    }
}