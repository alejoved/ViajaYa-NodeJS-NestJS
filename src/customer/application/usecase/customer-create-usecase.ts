import { Inject, Injectable, Logger } from "@nestjs/common";
import { CustomerCreateUseCaseInterface } from "../port/customer-create-usecase.interface";
import { CustomerRepositoryInterface } from "../../domain/repository/customer-repository.interface";
import { hashSync } from "bcrypt";
import { Role } from "../../../common/role";
import { Customer } from "../../domain/model/customer";
import { CustomerResponseDto } from "src/customer/adapter/dto/customer-response-dto";
import { CustomerCreateDto } from "src/customer/adapter/dto/customer-create-dto";
import { CustomerRestMapper } from "src/customer/adapter/mapper/customer-rest-mapper";

@Injectable()
export class CustomerCreateUseCase implements CustomerCreateUseCaseInterface {

    private readonly logger = new Logger("CustomerCreateUseCase");

    constructor(
        @Inject('CustomerRepositoryInterface')
        private readonly customerRepositoryInterface: CustomerRepositoryInterface
      ) {}

    async execute(customerCreateDto: CustomerCreateDto): Promise<CustomerResponseDto>{
        const customer = CustomerRestMapper.createDtoToModel(customerCreateDto);
        const password = hashSync(customer.auth!.password!, 3);
        customer.auth!.role = Role.CUSTOMER;
        customer.auth!.password = password;
        const response = await this.customerRepositoryInterface.create(customer);
        return CustomerRestMapper.modelToDto(response);
    }
}