import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CustomerRepositoryInterface } from "../../domain/repository/customer-repository.interface";
import { Customer } from "../../domain/model/customer";
import { CustomerGetUseCaseInterface } from "../port/customer-get-usecase.interface";
import { Constants } from "../../../common/constants";

@Injectable()
export class CustomerGetUseCase implements CustomerGetUseCaseInterface {

    private readonly logger = new Logger("CustomerGetUseCase");

    constructor(
        @Inject('CustomerRepositoryInterface')
        private readonly customerRepositoryInterface: CustomerRepositoryInterface
      ) {}

    async execute(): Promise<Customer[]>{
        const customerModel = await this.customerRepositoryInterface.get();
        return customerModel;
    }

    async executeById(id: string): Promise<Customer>{
        const customerModel = await this.customerRepositoryInterface.getById(id);
        if(!customerModel){
            throw new NotFoundException(Constants.customerNotFound);
        }
        return customerModel;
    }
    async executeByEmail(email: string): Promise<Customer>{
        const customerModel = await this.customerRepositoryInterface.getByEmail(email);
        if(!customerModel){
            throw new NotFoundException(Constants.customerNotFound);
        }
        return customerModel;
    }
}