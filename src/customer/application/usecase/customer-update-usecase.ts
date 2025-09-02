import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CustomerRepositoryInterface } from "../../domain/repository/customer-repository.interface";
import { Customer } from "../../domain/model/customer";
import { CustomerUpdateUseCaseInterface } from "../port/customer-update-usecase.interface";
import { CustomerUpdateDto } from "../../adapter/dto/customer-update-dto";
import { CustomerResponseDto } from "src/customer/adapter/dto/customer-response-dto";
import { CustomerRestMapper } from "src/customer/adapter/mapper/customer-rest-mapper";

@Injectable()
export class CustomerUpdateUseCase implements CustomerUpdateUseCaseInterface {

    private readonly logger = new Logger("CustomerUpdateUseCase");

    constructor(
        @Inject('CustomerRepositoryInterface')
        private readonly customerRepositoryInterface: CustomerRepositoryInterface
      ) {}

    async execute(customerUpdateDto: CustomerUpdateDto, id: string): Promise<CustomerResponseDto>{
        const customer = CustomerRestMapper.updateDtoToModel(customerUpdateDto, id);
        return await this.customerRepositoryInterface.update(customer, id);
    }
}