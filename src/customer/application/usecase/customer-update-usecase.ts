import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CustomerRepositoryInterface } from "../../domain/repository/customer-repository.interface";
import { CustomerUpdateUseCaseInterface } from "../port/customer-update-usecase.interface";
import { CustomerUpdateDto } from "../dto/customer-update-dto";
import { CustomerResponseDto } from "../../application/dto/customer-response-dto";
import { CustomerRestMapper } from "../mapper/customer-rest-mapper";
import { Constants } from "../../../common/constants";

@Injectable()
export class CustomerUpdateUseCase implements CustomerUpdateUseCaseInterface {

    private readonly logger = new Logger("CustomerUpdateUseCase");

    constructor(
        @Inject('CustomerRepositoryInterface')
        private readonly customerRepositoryInterface: CustomerRepositoryInterface
      ) {}

    async execute(customerUpdateDto: CustomerUpdateDto, id: string): Promise<CustomerResponseDto>{
        const customerExist = await this.customerRepositoryInterface.getById(id);
        if(!customerExist){
            throw new NotFoundException(Constants.customerNotFound);
        }
        const customer = CustomerRestMapper.updateDtoToModel(customerUpdateDto, id);
        customer.auth = customerExist.auth;
        const response = await this.customerRepositoryInterface.update(customer);
        const customerResponseDto = CustomerRestMapper.modelToDto(response);
        return customerResponseDto; 
    }
}