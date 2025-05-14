import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { Auth } from 'src/auth/service/auth.decorator';
import { AppointmentService } from '../service/appointment.service';
import { Role } from 'src/common/role';
import { AppointmentDTO } from '../dto/appointment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Appointments', "Appointment-related operations")
@Controller('appointment')
export class AppointmentController {

    constructor(private appointmentService: AppointmentService){}

    @ApiOperation({ summary : "Get all appointments currently" })
    @ApiResponse({status : 200, description : "Get all appointments successfull"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth()
    @Get()
    getAll(){
        return this.appointmentService.getAll();
    }

    @ApiOperation({ summary : "Get an appointment existing by uuid" })
    @ApiResponse({status : 200, description : "Get an appointment successful"})
    @ApiResponse({status : 404, description : "Appointment not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth()
    @Get(":id")
    getById(@Param("id", ParseUUIDPipe) id: string){
        return this.appointmentService.getById(id);
    }
    
    @ApiOperation({ summary : "Create a new appointment associated with a patient and physician" })
    @ApiResponse({status : 201, description : "Appointment created successfull"})
    @ApiResponse({status : 404, description : "Patient or physician not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth(Role.ADMIN)
    @Post()
    create(@Body() body: AppointmentDTO){
        return this.appointmentService.create(body);
    }

    @ApiOperation({ summary : "Update data about an appointment by uuid" })
    @ApiResponse({status : 200, description : "Appointment updated successfull"})
    @ApiResponse({status : 404, description : "Appointment not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth()
    @Put()
    update(@Body() body: AppointmentDTO, @Param("id", ParseUUIDPipe) id: string){
        return this.appointmentService.update(body, id);
    }
    
    @ApiOperation({ summary : "Delete an appointment by uuid" })
    @ApiResponse({status : 200, description : "Appointment deleted successfull"})
    @ApiResponse({status : 404, description : "Appointment not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth(Role.ADMIN)
    @Delete()
    delete(@Param("id", ParseUUIDPipe) id: string){
        this.appointmentService.delete(id);
    }
}
