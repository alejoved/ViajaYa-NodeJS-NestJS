import { Inject, Injectable, Logger } from "@nestjs/common";
import { CustomerCreateUseCaseInterface } from "../port/customer-create-usecase.interface";
import { CustomerRepositoryInterface } from "../../domain/repository/customer-repository.interface";
import { hashSync } from "bcrypt";
import { Role } from "../../../common/role";
import { CustomerModel } from "../../domain/model/customer-model";

@Injectable()
export class CustomerCreateUseCase implements CustomerCreateUseCaseInterface {

    private readonly logger = new Logger("CustomerCreateUseCase");

    constructor(
        @Inject('CustomerRepositoryInterface')
        private readonly customerRepositoryInterface: CustomerRepositoryInterface
      ) {}

    async execute(customerModel: CustomerModel): Promise<CustomerModel>{
        const password = hashSync(customerModel.authModel.password!, 3);
        customerModel.authModel.role = Role.CUSTOMER;
        customerModel.authModel.password = password;
        return await this.customerRepositoryInterface.create(customerModel);
    }
}