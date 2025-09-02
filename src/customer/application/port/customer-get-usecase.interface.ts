import { Customer } from "../../domain/model/customer";

export interface CustomerGetUseCaseInterface {
  execute(): Promise<Customer[]>;
  executeById(id: string): Promise<Customer>;
  executeByEmail(email: string): Promise<Customer>;
}