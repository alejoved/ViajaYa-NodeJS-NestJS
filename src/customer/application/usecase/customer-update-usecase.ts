import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CustomerRepositoryInterface } from "../../domain/repository/customer-repository.interface";
import { CustomerModel } from "../../domain/model/customer-model";
import { CustomerUpdateUseCaseInterface } from "../interface/customer-update-usecase.interface";
import { Constants } from "../../../common/constants";
import { CustomerMapper } from "../../adapter/mapper/customer-mapper";

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