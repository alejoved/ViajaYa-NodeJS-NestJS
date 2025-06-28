import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CustomerRepositoryInterface } from "../../domain/repository/customer-repository.interface";
import { CustomerModel } from "../../domain/model/customer-model";
import { CustomerUpdateUseCaseInterface } from "../port/customer-update-usecase.interface";
import { Constants } from "../../../common/constants";

@Injectable()
export class CustomerUpdateUseCase implements CustomerUpdateUseCaseInterface {

    private readonly logger = new Logger("CustomerUpdateUseCase");

    constructor(
        @Inject('CustomerRepositoryInterface')
        private readonly customerRepositoryInterface: CustomerRepositoryInterface
      ) {}

    async execute(customerModel: CustomerModel, id: string): Promise<CustomerModel>{
        const customerExist = await this.customerRepositoryInterface.getById(id);
        if(!customerExist){
            throw new NotFoundException(Constants.customerNotFound);
        }
        customerModel.id = id;
        return await this.customerRepositoryInterface.update(customerModel);
         
    }
}