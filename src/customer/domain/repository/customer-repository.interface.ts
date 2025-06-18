import { CustomerModel } from "../model/customer-model";

export interface CustomerRepositoryInterface{
    get(): Promise<CustomerModel[]>;
    getById(id: string): Promise<CustomerModel>;
    getByEmail(email: string): Promise<CustomerModel>;
    create(customerModel: CustomerModel): Promise<CustomerModel>
    update(customerModel: CustomerModel): Promise<CustomerModel>
    delete(id: string): Promise<void>
}