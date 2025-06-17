import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CustomerRepositoryInterface } from "../../../customer/domain/repository/customer-repository.interface";
import { CustomerModel } from "../../../customer/domain/model/customer-model";
import { CustomerUpdateUseCaseInterface } from "../port/customer-update-usecase.interface";
import { CustomerMapper } from "../mapper/customer-mapper";
import { Constants } from "src/common/constants";

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
        const customerEntity = CustomerMapper.modelToEntity(customerModel);
        customerEntity.id = id;
        await this.customerRepositoryInterface.update(customerEntity);
        return CustomerMapper.entityToModel(customerEntity);
    }
}