import { CustomerModel } from "../../../customer/domain/model/customer-model";

export interface CustomerGetUseCaseInterface {
  execute(): Promise<CustomerModel[]>;
  executeById(command: string): Promise<CustomerModel>;
  executeByEmail(command: string): Promise<CustomerModel>;
}