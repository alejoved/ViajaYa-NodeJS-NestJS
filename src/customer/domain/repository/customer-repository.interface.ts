import { Customer } from "../../infrastructure/entity/customer";

export interface CustomerRepositoryInterface{
    get(): Promise<Customer[]>;
    getById(id: string): Promise<Customer | null>;
    getByEmail(email: string): Promise<Customer | null>;
    create(customer: Customer): Promise<Customer>
    update(customer: Customer): Promise<Customer>
    delete(customer: Customer): Promise<void>
}