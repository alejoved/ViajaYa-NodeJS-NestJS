import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CustomerRepositoryInterface } from "../../domain/repository/customer-repository.interface";
import { Customer } from "../../domain/model/customer";
import { CustomerUpdateUseCaseInterface } from "../port/customer-update-usecase.interface";
import { Constants } from "../../../common/constants";

@Injectable()
export class CustomerUpdateUseCase implements CustomerUpdateUseCaseInterface {

    private readonly logger = new Logger("CustomerUpdateUseCase");

    constructor(
        @Inject('CustomerRepositoryInterface')
        private readonly customerRepositoryInterface: CustomerRepositoryInterface
      ) {}

    async execute(customer: Customer, id: string): Promise<Customer>{
        const customerExist = await this.customerRepositoryInterface.getById(id);
        if(!customerExist){
            throw new NotFoundException(Constants.customerNotFound);
        }
        Object.assign(customerExist, customer);
        return await this.customerRepositoryInterface.update(customer);
         
    }
}