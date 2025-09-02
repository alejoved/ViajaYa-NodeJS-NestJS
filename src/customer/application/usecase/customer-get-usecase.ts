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
        const customer = await this.customerRepositoryInterface.get();
        return customer;
    }

    async executeById(id: string): Promise<Customer>{
        const customer = await this.customerRepositoryInterface.getById(id);
        if(!customer){
            throw new NotFoundException(Constants.customerNotFound);
        }
        return customer;
    }
    async executeByEmail(email: string): Promise<Customer>{
        const customer = await this.customerRepositoryInterface.getByEmail(email);
        if(!customer){
            throw new NotFoundException(Constants.customerNotFound);
        }
        return customer;
    }
}