import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { Auth } from 'src/auth/service/auth.decorator';
import { AppointmentService } from '../service/appointment.service';
import { Role } from 'src/common/role';
import { AppointmentDTO } from '../dto/appointment.dto';

@Controller('appointment')
export class AppointmentController {

    constructor(private appointmentService: AppointmentService){}

    @Auth()
    @Get()
    getAll(){
        return this.appointmentService.getAll();
    }

    @Auth()
    @Get(":id")
    getById(@Param("id", ParseUUIDPipe) id: string){
        return this.appointmentService.getById(id);
    }
    
    @Auth(Role.ADMIN)
    @Post()
    create(@Body() body: AppointmentDTO){
        return this.appointmentService.create(body);
    }

    @Auth()
    @Put()
    update(@Body() body: AppointmentDTO, @Param("id", ParseUUIDPipe) id: string){
        return this.appointmentService.update(body, id);
    }
    
    @Auth(Role.ADMIN)
    @Delete()
    delete(@Param("id", ParseUUIDPipe) id: string){
        this.appointmentService.delete(id);
    }
}
