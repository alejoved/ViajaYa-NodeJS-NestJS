import { CustomerEntity } from "../../infrastructure/entity/customer-entity";

export interface CustomerRepositoryInterface{
    get(): Promise<CustomerEntity[]>;
    getById(id: string): Promise<CustomerEntity | null>;
    getByEmail(email: string): Promise<CustomerEntity | null>;
    create(customerEntity: CustomerEntity): Promise<CustomerEntity>
    update(customerEntity: CustomerEntity): Promise<CustomerEntity>
    delete(customerEntity: CustomerEntity): Promise<void>
}