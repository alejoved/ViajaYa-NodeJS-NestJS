import { Customer } from "../model/customer";

export interface CustomerRepositoryInterface{
    get(): Promise<Customer[]>;
    getById(id: string): Promise<Customer>;
    getByEmail(email: string): Promise<Customer>;
    create(customer: Customer): Promise<Customer>
    update(customer: Customer): Promise<Customer>
    delete(id: string): Promise<void>
}