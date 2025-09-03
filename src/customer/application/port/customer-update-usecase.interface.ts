import { CustomerResponseDto } from "src/customer/application/dto/customer-response-dto";
import { CustomerUpdateDto } from "../dto/customer-update-dto";

export interface CustomerUpdateUseCaseInterface {
  execute(customerUpdateDto: CustomerUpdateDto, id: string): Promise<CustomerResponseDto>;
}