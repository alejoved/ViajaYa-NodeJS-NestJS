import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { PatientService } from '../service/patient.service';

@Controller('patient')
export class PatientController {
    constructor(private patientService: PatientService){
        
    }

    @Get()
    getAll(){
        return this.patientService.getAll();
    }
}
