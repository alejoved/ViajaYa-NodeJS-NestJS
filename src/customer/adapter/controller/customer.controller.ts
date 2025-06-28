import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe, Inject } from '@nestjs/common';
import { Role } from '../../../common/role';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerDTO } from '../dto/customer-dto';
import { AuthDecorator } from '../../../auth/infrastructure/config/auth.decorator';
import { CustomerGetUseCaseInterface } from '../../application/port/customer-get-usecase.interface';
import { CustomerCreateUseCaseInterface } from '../../application/port/customer-create-usecase.interface';
import { CustomerUpdateUseCaseInterface } from '../../application/port/customer-update-usecase.interface';
import { CustomerDeleteUseCaseInterface } from '../../application/port/customer-delete-usecase.interface';
import { CustomerMapper } from '../mapper/customer-mapper';

@ApiTags('Customers')
@Controller('customer')
export class CustomerController {
    
    constructor(@Inject("CustomerGetUseCaseInterface") private readonly customerGetUseCaseInterface: CustomerGetUseCaseInterface,
                @Inject("CustomerCreateUseCaseInterface") private readonly customerCreateUseCaseInterface: CustomerCreateUseCaseInterface,
                @Inject("CustomerUpdateUseCaseInterface") private readonly customerUpdateUseCaseInterface: CustomerUpdateUseCaseInterface,
                @Inject("CustomerDeleteUseCaseInterface") private readonly customerDeleteUseCaseInterface: CustomerDeleteUseCaseInterface, ){}        
    
    @ApiOperation({ summary : "Get all customers currently" })
    @ApiResponse({status : 200, description : "Get all customers successfully"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Get()
    async getAll(){
        const customerModel = await this.customerGetUseCaseInterface.execute();
        const customerResponseDTO = customerModel.map(CustomerMapper.modelToDto);
        return customerResponseDTO;
    }

    @ApiOperation({ summary : "Get an customers existing by uuid" })
    @ApiResponse({status : 200, description : "Get an customer successfully"})
    @ApiResponse({status : 404, description : "Customer not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Get(":id")
    async getById(@Param("id", ParseUUIDPipe) id: string){
        const customerModel = await this.customerGetUseCaseInterface.executeById(id);
        const customerResponseDTO = CustomerMapper.modelToDto(customerModel);
        return customerResponseDTO;
    }

    @ApiOperation({ summary : "Get an customer existing by uuid" })
    @ApiResponse({status : 200, description : "Get an customer successfully"})
    @ApiResponse({status : 404, description : "Customer not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Get("/email/:email")
    async getByIdentification(@Param("email") email: string){
        const customerModel = await this.customerGetUseCaseInterface.executeByEmail(email);
        const customerResponseDTO = CustomerMapper.modelToDto(customerModel);
        return customerResponseDTO;
    }
    
    @ApiOperation({ summary : "Create a new customer associated with a email" })
    @ApiResponse({status : 201, description : "Customer created successfully"})
    @ApiResponse({status : 409, description : "Customer already exists"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Post()
    async create(@Body() customerDTO: CustomerDTO){
        const customerModel = CustomerMapper.dtoToModel(customerDTO);
        const response = await this.customerCreateUseCaseInterface.execute(customerModel);
        const customerResponseDTO = CustomerMapper.modelToDto(response);
        return customerResponseDTO;
    }
    
    @ApiOperation({ summary : "Update data about a customer by uuid" })
    @ApiResponse({status : 201, description : "Customer updated successfully"})
    @ApiResponse({status : 404, description : "Customer not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Put(":id")
    async update(@Body() customerDTO: CustomerDTO, @Param("id", ParseUUIDPipe) id: string){
        const customerModel = CustomerMapper.dtoToModel(customerDTO);
        const response = await this.customerUpdateUseCaseInterface.execute(customerModel, id);
        const customerResponseDTO = CustomerMapper.modelToDto(response);
        return customerResponseDTO;
    }

    @ApiOperation({ summary : "Delete an customer by uuid" })
    @ApiResponse({status : 200, description : "Customer deleted successfully"})
    @ApiResponse({status : 404, description : "Customer not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Delete(":id")
    async delete(@Param("id", ParseUUIDPipe) id: string){
        await this.customerDeleteUseCaseInterface.execute(id);
    }
}
