import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe, Inject } from '@nestjs/common';
import { Role } from '../../../common/role';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerCreateDto } from '../../application/dto/customer-create-dto';
import { CustomerUpdateDto } from '../../application/dto/customer-update-dto';
import { AuthDecorator } from '../../../auth/infrastructure/config/auth.decorator';
import { CustomerGetUseCaseInterface } from '../../application/port/customer-get-usecase.interface';
import { CustomerCreateUseCaseInterface } from '../../application/port/customer-create-usecase.interface';
import { CustomerUpdateUseCaseInterface } from '../../application/port/customer-update-usecase.interface';
import { CustomerDeleteUseCaseInterface } from '../../application/port/customer-delete-usecase.interface';

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
        const customerResponseDto = await this.customerGetUseCaseInterface.execute();
        return customerResponseDto;
    }

    @ApiOperation({ summary : "Get an customers existing by uuid" })
    @ApiResponse({status : 200, description : "Get an customer successfully"})
    @ApiResponse({status : 404, description : "Customer not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Get(":id")
    async getById(@Param("id", ParseUUIDPipe) id: string){
        const customerResponseDto = await this.customerGetUseCaseInterface.executeById(id);
        return customerResponseDto;
    }

    @ApiOperation({ summary : "Get an customer existing by uuid" })
    @ApiResponse({status : 200, description : "Get an customer successfully"})
    @ApiResponse({status : 404, description : "Customer not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Get("/email/:email")
    async getByIdentification(@Param("email") email: string){
        const customerResponseDto = await this.customerGetUseCaseInterface.executeByEmail(email);
        return customerResponseDto;
    }
    
    @ApiOperation({ summary : "Create a new customer associated with a email" })
    @ApiResponse({status : 201, description : "Customer created successfully"})
    @ApiResponse({status : 409, description : "Customer already exists"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Post()
    async create(@Body() customerCreateDto: CustomerCreateDto){
        const customerResponseDto = await this.customerCreateUseCaseInterface.execute(customerCreateDto);
        return customerResponseDto;
    }
    
    @ApiOperation({ summary : "Update data about a customer by uuid" })
    @ApiResponse({status : 201, description : "Customer updated successfully"})
    @ApiResponse({status : 404, description : "Customer not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Put(":id")
    async update(@Body() customerUpdateDto: CustomerUpdateDto, @Param("id", ParseUUIDPipe) id: string){
        const customerResponseDto = await this.customerUpdateUseCaseInterface.execute(customerUpdateDto, id);
        return customerResponseDto;
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
