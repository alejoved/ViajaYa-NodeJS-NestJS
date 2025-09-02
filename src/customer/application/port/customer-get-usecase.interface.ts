import { CustomerResponseDto } from "src/customer/adapter/dto/customer-response-dto";

export interface CustomerGetUseCaseInterface {
  execute(): Promise<CustomerResponseDto[]>;
  executeById(id: string): Promise<CustomerResponseDto>;
  executeByEmail(email: string): Promise<CustomerResponseDto>;
}