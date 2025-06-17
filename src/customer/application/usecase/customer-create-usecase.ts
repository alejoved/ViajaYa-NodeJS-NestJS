import { Inject, Injectable, Logger } from "@nestjs/common";
import { CustomerCreateUseCaseInterface } from "../port/customer-create-usecase.interface";
import { CustomerRepositoryInterface } from "../../../customer/domain/repository/customer-repository.interface";
import { hashSync } from "bcrypt";
import { Role } from "../../../common/role";
import { CustomerModel } from "../../../customer/domain/model/customer-model";
import { CustomerMapper } from "../mapper/customer-mapper";

@Injectable()
export class CustomerCreateUseCase implements CustomerCreateUseCaseInterface {

    private readonly logger = new Logger("AuthService");

    constructor(
        @Inject('CustomerRepositoryInterface')
        private readonly customerRepositoryInterface: CustomerRepositoryInterface
      ) {}

    async execute(customerModel: CustomerModel): Promise<CustomerModel>{
        const password = hashSync(customerModel.authModel.password!, 3);
        customerModel.authModel.role = Role.CUSTOMER;
        customerModel.authModel.password = password;
        const customerEntity = CustomerMapper.modelToEntity(customerModel);
        await this.customerRepositoryInterface.create(customerEntity);
        return CustomerMapper.entityToModel(customerEntity);
    }
}