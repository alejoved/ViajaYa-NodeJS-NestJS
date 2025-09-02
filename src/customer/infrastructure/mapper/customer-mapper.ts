import { Customer } from "../../domain/model/customer";
import { CustomerEntity } from "../entity/customer-entity";

export class CustomerMapper{
    
    static modelToEntity(customer: Customer): CustomerEntity {
        return {
            id: customer.id,
            identification: customer.identification,
            name: customer.name,
            authEntity: {
                id: customer.auth.id,
                email: customer.auth.email, 
                password: customer.auth.password,
                role: customer.auth.role!
            }
        };
    }

    static entityToModel(customerEntity: CustomerEntity): Customer {
        return {
            id: customerEntity.id!,
            identification: customerEntity.identification,
            name: customerEntity.name,
            auth : {
                id: customerEntity.authEntity.id,
                email: customerEntity.authEntity.email, 
                password: customerEntity.authEntity.password, 
                role: customerEntity.authEntity.role
            }
        };
    }
}