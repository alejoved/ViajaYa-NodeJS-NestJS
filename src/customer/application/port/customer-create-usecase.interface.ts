import { CustomerResponseDto } from "src/customer/application/dto/customer-response-dto";
import { CustomerCreateDto } from "../dto/customer-create-dto";

export interface CustomerCreateUseCaseInterface {
  execute(customerCreateDto: CustomerCreateDto): Promise<CustomerResponseDto>;
}