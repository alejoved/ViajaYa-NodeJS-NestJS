import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe, Inject } from '@nestjs/common';
import { Role } from '../../../common/role';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerDTO } from '../dto/customer-dto';
import { AuthDecorator } from '../../../auth/infrastructure/config/auth.decorator';
import { CustomerGetUseCaseInterface } from '../../../customer/application/port/customer-get-usecase.interface';
import { CustomerCreateUseCaseInterface } from '../../../customer/application/port/customer-create-usecase.interface';
import { CustomerUpdateUseCaseInterface } from '../../../customer/application/port/customer-update-usecase.interface';
import { CustomerDeleteUseCaseInterface } from '../../../customer/application/port/customer-delete-usecase.interface';
import { plainToInstance } from 'class-transformer';
import { CustomerResponseDTO } from '../dto/customer-response-dto';
import { CustomerCreateCommand } from 'src/customer/application/command/customer-create-command';

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
    getAll(){
        const customerModel = this.customerGetUseCaseInterface.execute();
        const customerResponseDTO = plainToInstance(CustomerResponseDTO, customerModel, {excludeExtraneousValues: true});
        return customerResponseDTO;
    }

    @ApiOperation({ summary : "Get an customers existing by uuid" })
    @ApiResponse({status : 200, description : "Get an customer successfully"})
    @ApiResponse({status : 404, description : "Customer not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Get(":id")
    getById(@Param("id", ParseUUIDPipe) id: string){
        const customerModel = this.customerGetUseCaseInterface.executeById(id);
        const customerResponseDTO = plainToInstance(CustomerResponseDTO, customerModel, {excludeExtraneousValues: true});
        return customerResponseDTO;
    }

    @ApiOperation({ summary : "Get an customer existing by uuid" })
    @ApiResponse({status : 200, description : "Get an customer successfully"})
    @ApiResponse({status : 404, description : "Customer not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Get("/email/:email")
    getByIdentification(@Param("email") email: string){
        const customerModel = this.customerGetUseCaseInterface.executeByEmail(email);
        const customerResponseDTO = plainToInstance(CustomerResponseDTO, customerModel, {excludeExtraneousValues: true});
        return customerResponseDTO;
    }
    
    @ApiOperation({ summary : "Create a new customer associated with a email" })
    @ApiResponse({status : 201, description : "Customer created successfully"})
    @ApiResponse({status : 409, description : "Customer already exists"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Post()
    create(@Body() customerDTO: CustomerDTO){
        const customerCreateCommand = plainToInstance(CustomerCreateCommand, customerDTO, {excludeExtraneousValues: true});
        const customerModel = this.customerCreateUseCaseInterface.execute(customerCreateCommand);
        const customerResponseDTO = plainToInstance(CustomerResponseDTO, customerModel, {excludeExtraneousValues: true});
        return customerResponseDTO;
    }
    
    @ApiOperation({ summary : "Update data about a customer by uuid" })
    @ApiResponse({status : 201, description : "Customer updated successfully"})
    @ApiResponse({status : 404, description : "Customer not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Put(":id")
    update(@Body() customerDTO: CustomerDTO, @Param("id", ParseUUIDPipe) id: string){
        const customerCreateCommand = plainToInstance(CustomerCreateCommand, customerDTO, {excludeExtraneousValues: true});
        const customerModel = this.customerUpdateUseCaseInterface.execute(customerCreateCommand);
        const customerResponseDTO = plainToInstance(CustomerResponseDTO, customerModel, {excludeExtraneousValues: true});
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
