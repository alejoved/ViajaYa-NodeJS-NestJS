import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { PatientService } from '../service/patient.service';
import { PatientDTO } from '../dto/patient.dto';
import { Auth } from 'src/auth/service/auth.decorator';
import { Role } from 'src/common/role';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Patients', "Patient related operations")
@Controller('patient')
export class PatientController {
    constructor(private patientService: PatientService){
        
    }

    @ApiOperation({ summary : "Get all patients currently" })
    @ApiResponse({status : 200, description : "Get all appointments successfull"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth()
    @Get()
    getAll(){
        return this.patientService.getAll();
    }

    @ApiOperation({ summary : "Get an patient existing by uuid" })
    @ApiResponse({status : 200, description : "Get an patient successful"})
    @ApiResponse({status : 404, description : "Patient not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth()
    @Get(":id")
    getById(@Param("id", ParseUUIDPipe) id: string){
        return this.patientService.getById(id);
    }
    
    @ApiOperation({ summary : "Create a new patient associated with a identification, name and an insurance" })
    @ApiResponse({status : 201, description : "Patient created successfull"})
    @ApiResponse({status : 409, description : "Patient already exists"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth(Role.ADMIN)
    @Post()
    create(@Body() body: PatientDTO){
        return this.patientService.create(body);
    }

    @ApiOperation({ summary : "Update data about a patient by uuid" })
    @ApiResponse({status : 201, description : "Patient updated successfull"})
    @ApiResponse({status : 404, description : "Patient not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth()
    @Put()
    update(@Body() body: PatientDTO, @Param("id", ParseUUIDPipe) id: string){
        return this.patientService.update(body, id);
    }
    
    @ApiOperation({ summary : "Delete an patient by uuid" })
    @ApiResponse({status : 201, description : "Patient deleted successfull"})
    @ApiResponse({status : 404, description : "Patient not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth(Role.ADMIN)
    @Delete()
    delete(@Param("id", ParseUUIDPipe) id: string){
        this.patientService.delete(id);
    }
}
