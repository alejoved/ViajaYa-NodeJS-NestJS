import { Inject, Injectable, Logger } from "@nestjs/common";
import { CustomerCreateUseCaseInterface } from "../port/customer-create-usecase.interface";
import { CustomerRepositoryInterface } from "../../domain/repository/customer-repository.interface";
import { hashSync } from "bcrypt";
import { Role } from "../../../common/role";
import { Customer } from "../../domain/model/customer";

@Injectable()
export class CustomerCreateUseCase implements CustomerCreateUseCaseInterface {

    private readonly logger = new Logger("CustomerCreateUseCase");

    constructor(
        @Inject('CustomerRepositoryInterface')
        private readonly customerRepositoryInterface: CustomerRepositoryInterface
      ) {}

    async execute(customerModel: Customer): Promise<Customer>{
        const password = hashSync(customerModel.auth.password!, 3);
        customerModel.auth.role = Role.CUSTOMER;
        customerModel.auth.password = password;
        return await this.customerRepositoryInterface.create(customerModel);
    }
}