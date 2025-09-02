import { Customer } from "../../domain/model/customer";

export interface CustomerCreateUseCaseInterface {
  execute(customerModel: Customer): Promise<Customer>;
}