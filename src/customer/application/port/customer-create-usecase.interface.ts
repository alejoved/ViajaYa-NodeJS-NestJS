import { CustomerCreateCommand } from "../command/customer-create-command";
import { CustomerModel } from "src/customer/domain/model/customer-model";

export interface CustomerCreateUseCaseInterface {
  execute(command: CustomerCreateCommand): Promise<CustomerModel>;
}