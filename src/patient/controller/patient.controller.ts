import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { PatientService } from '../service/patient.service';
import { PatientDTO } from '../dto/patient.dto';

@Controller('patient')
export class PatientController {
    constructor(private patientService: PatientService){
        
    }

    @Get()
    getAll(){
        return this.patientService.getAll();
    }

    @Get(":id")
    getById(@Param("id", ParseUUIDPipe) id: string){
        return this.patientService.getById(id);
    }
    
    @Post()
    create(@Body() body: PatientDTO){
        return this.patientService.create(body);
    }

    @Put()
    update(@Body() body: PatientDTO, @Param("id", ParseUUIDPipe) id: string){
        return this.patientService.update(body, id);
    }
    @Delete()
    delete(@Param("id", ParseUUIDPipe) id: string){
        this.patientService.delete(id);
    }
}
