import { Customer } from "../../domain/model/customer";

export interface CustomerUpdateUseCaseInterface {
  execute(customerUpdate: Customer, id: string): Promise<Customer>;
}