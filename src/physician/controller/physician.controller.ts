import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { PhysicianService } from '../service/physician.service';
import { PhysicianDTO } from '../dto/physician.dto';
import { Auth } from 'src/config/auth.decorator';
import { Role } from 'src/common/role';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Physicians')
@Controller('physician')
export class PhysicianController {
    
    constructor(private physicianService: PhysicianService){}        
    
    @ApiOperation({ summary : "Get all physicians currently" })
    @ApiResponse({status : 200, description : "Get all physicians successfully"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth()
    @Get()
    getAll(){
        return this.physicianService.getAll();
    }

    @ApiOperation({ summary : "Get an physician existing by uuid" })
    @ApiResponse({status : 200, description : "Get an physician successfully"})
    @ApiResponse({status : 404, description : "Physician not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth(Role.ADMIN)
    @Get(":id")
    getById(@Param("id", ParseUUIDPipe) id: string){
        return this.physicianService.getById(id);
    }

    @ApiOperation({ summary : "Get an physician existing by uuid" })
    @ApiResponse({status : 200, description : "Get an physician successfully"})
    @ApiResponse({status : 404, description : "Physician not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth()
    @Get("/identification/:identification")
    getByIdentification(@Param("identification") identification: string){
        return this.physicianService.getByIdentification(identification);
    }
    
    @ApiOperation({ summary : "Create a new physician associated with a identification, name and an code" })
    @ApiResponse({status : 201, description : "Physician created successfully"})
    @ApiResponse({status : 409, description : "Physician already exists"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth(Role.ADMIN)
    @Post()
    create(@Body() body: PhysicianDTO){
        return this.physicianService.create(body);
    }
    
    @ApiOperation({ summary : "Update data about a physician by uuid" })
    @ApiResponse({status : 201, description : "Physician updated successfully"})
    @ApiResponse({status : 404, description : "Physician not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth()
    @Put()
    update(@Body() body: PhysicianDTO, @Param("id", ParseUUIDPipe) id: string){
        return this.physicianService.update(body, id);
    }

    @ApiOperation({ summary : "Delete an physician by uuid" })
    @ApiResponse({status : 201, description : "Physician deleted successfully"})
    @ApiResponse({status : 404, description : "Physician not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth(Role.ADMIN)
    @Delete()
    delete(@Param("id", ParseUUIDPipe) id: string){
        this.physicianService.delete(id);
    }
}
