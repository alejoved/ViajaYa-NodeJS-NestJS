import { CustomerResponseDto } from "src/customer/adapter/dto/customer-response-dto";
import { CustomerUpdateDto } from "../../adapter/dto/customer-update-dto";

export interface CustomerUpdateUseCaseInterface {
  execute(customerUpdateDto: CustomerUpdateDto, id: string): Promise<CustomerResponseDto>;
}