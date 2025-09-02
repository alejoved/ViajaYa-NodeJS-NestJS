import { CustomerResponseDto } from "src/customer/adapter/dto/customer-response-dto";
import { CustomerCreateDto } from "../../adapter/dto/customer-create-dto";

export interface CustomerCreateUseCaseInterface {
  execute(customerCreateDto: CustomerCreateDto): Promise<CustomerResponseDto>;
}