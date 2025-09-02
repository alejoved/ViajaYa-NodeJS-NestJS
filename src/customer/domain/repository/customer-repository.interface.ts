import { Customer } from "../model/customer";

export interface CustomerRepositoryInterface{
    get(): Promise<Customer[]>;
    getById(id: string): Promise<Customer>;
    getByEmail(email: string): Promise<Customer>;
    create(customerModel: Customer): Promise<Customer>
    update(customerModel: Customer): Promise<Customer>
    delete(id: string): Promise<void>
}