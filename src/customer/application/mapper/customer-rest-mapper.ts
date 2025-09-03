import { CustomerResponseDto } from "../../application/dto/customer-response-dto";
import { Customer } from "../../domain/model/customer";
import { CustomerCreateDto } from "../../application/dto/customer-create-dto";
import { CustomerUpdateDto } from "../../application/dto/customer-update-dto";

export class CustomerRestMapper{
    static createDtoToModel(customerCreateDTO: CustomerCreateDto): Customer {
            return {
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
            id: customer.id!,
            identification: customer.identification,
            name: customer.name
        };
    }
}