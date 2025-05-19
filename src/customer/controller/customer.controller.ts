import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { CustomerService } from '../service/customer.service';
import { Auth } from 'src/config/auth.decorator';
import { Role } from 'src/common/role';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerDTO } from '../dto/customer.dto';

@ApiTags('Customers')
@Controller('customer')
export class CustomerController {
    
    constructor(private customerService: CustomerService){}        
    
    @ApiOperation({ summary : "Get all customers currently" })
    @ApiResponse({status : 200, description : "Get all customers successfully"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth()
    @Get()
    getAll(){
        return this.customerService.getAll();
    }

    @ApiOperation({ summary : "Get an customers existing by uuid" })
    @ApiResponse({status : 200, description : "Get an customer successfully"})
    @ApiResponse({status : 404, description : "Customer not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth(Role.ADMIN)
    @Get(":id")
    getById(@Param("id", ParseUUIDPipe) id: string){
        return this.customerService.getById(id);
    }

    @ApiOperation({ summary : "Get an customer existing by uuid" })
    @ApiResponse({status : 200, description : "Get an customer successfully"})
    @ApiResponse({status : 404, description : "Customer not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth()
    @Get("/email/:email")
    getByIdentification(@Param("email") email: string){
        return this.customerService.getByEmail(email);
    }
    
    @ApiOperation({ summary : "Create a new customer associated with a email" })
    @ApiResponse({status : 201, description : "Customer created successfully"})
    @ApiResponse({status : 409, description : "Customer already exists"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth(Role.ADMIN)
    @Post()
    create(@Body() body: CustomerDTO){
        return this.customerService.create(body);
    }
    
    @ApiOperation({ summary : "Update data about a customer by uuid" })
    @ApiResponse({status : 201, description : "Customer updated successfully"})
    @ApiResponse({status : 404, description : "Customer not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth()
    @Put()
    update(@Body() body: CustomerDTO, @Param("id", ParseUUIDPipe) id: string){
        return this.customerService.update(body, id);
    }

    @ApiOperation({ summary : "Delete an customer by uuid" })
    @ApiResponse({status : 201, description : "Customer deleted successfully"})
    @ApiResponse({status : 404, description : "Customer not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth(Role.ADMIN)
    @Delete()
    delete(@Param("id", ParseUUIDPipe) id: string){
        this.customerService.delete(id);
    }
}
