import { CustomerResponseDto } from "../dto/customer-response-dto";
import { Customer } from "../../domain/model/customer";
import { CustomerCreateDto } from "../dto/customer-create-dto";
import { CustomerUpdateDto } from "../dto/customer-update-dto";

export class CustomerRestMapper{
    static createDtoToModel(customerCreateDTO: CustomerCreateDto): Customer {
            return {
                id: "",
                identification: customerCreateDTO.identification,
                name: customerCreateDTO.name,
                auth:{
                    email: customerCreateDTO.email,
                    password: customerCreateDTO.password    
                }
            };
        }
    static updateDtoToModel(customerUpdateDto: CustomerUpdateDto, id: string): Customer {
            return {
                id: id,
                identification: customerUpdateDto.identification,
                name: customerUpdateDto.name,
            };
        }

    static modelToDto(customer: Customer): CustomerResponseDto {
        return {
            id: customer.id,
            identification: customer.identification,
            name: customer.name
        };
    }
}