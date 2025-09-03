import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CustomerRepositoryInterface } from "../../domain/repository/customer-repository.interface";
import { CustomerGetUseCaseInterface } from "../port/customer-get-usecase.interface";
import { Constants } from "../../../common/constants";
import { CustomerResponseDto } from "../dto/customer-response-dto";
import { CustomerRestMapper } from "../mapper/customer-rest-mapper";

@Injectable()
export class CustomerGetUseCase implements CustomerGetUseCaseInterface {

    private readonly logger = new Logger("CustomerGetUseCase");

    constructor(
        @Inject('CustomerRepositoryInterface')
        private readonly customerRepositoryInterface: CustomerRepositoryInterface
      ) {}

    async execute(): Promise<CustomerResponseDto[]>{
        const customers = await this.customerRepositoryInterface.get();
        const customerResponseDto = customers.map(CustomerRestMapper.modelToDto);
        return customerResponseDto;
    }

    async executeById(id: string): Promise<CustomerResponseDto>{
        const customer = await this.customerRepositoryInterface.getById(id);
        if(!customer){
            throw new NotFoundException(Constants.customerNotFound);
        }
        const customerResponseDto = CustomerRestMapper.modelToDto(customer);
        return customerResponseDto;
    }
    async executeByEmail(email: string): Promise<CustomerResponseDto>{
        const customer = await this.customerRepositoryInterface.getByEmail(email);
        if(!customer){
            throw new NotFoundException(Constants.customerNotFound);
        }
        const customerResponseDto = CustomerRestMapper.modelToDto(customer);
        return customerResponseDto;
    }
}