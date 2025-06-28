import { CustomerModel } from "../../domain/model/customer-model";

export interface CustomerGetUseCaseInterface {
  execute(): Promise<CustomerModel[]>;
  executeById(id: string): Promise<CustomerModel>;
  executeByEmail(email: string): Promise<CustomerModel>;
}