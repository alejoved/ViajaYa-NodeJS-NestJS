import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { PatientService } from '../service/patient.service';
import { PatientDTO } from '../dto/patient.dto';
import { Auth } from 'src/auth/service/auth.decorator';
import { Role } from 'src/common/role';

@Controller('patient')
export class PatientController {
    constructor(private patientService: PatientService){
        
    }

    @Auth()
    @Get()
    getAll(){
        return this.patientService.getAll();
    }

    @Auth()
    @Get(":id")
    getById(@Param("id", ParseUUIDPipe) id: string){
        return this.patientService.getById(id);
    }
    
    @Auth(Role.ADMIN)
    @Post()
    create(@Body() body: PatientDTO){
        return this.patientService.create(body);
    }

    @Auth()
    @Put()
    update(@Body() body: PatientDTO, @Param("id", ParseUUIDPipe) id: string){
        return this.patientService.update(body, id);
    }
    
    @Auth(Role.ADMIN)
    @Delete()
    delete(@Param("id", ParseUUIDPipe) id: string){
        this.patientService.delete(id);
    }
}
