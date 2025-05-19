import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { Auth } from 'src/config/auth.decorator';
import { ReservationService } from '../service/reservation.service';
import { Role } from 'src/common/role';
import { ReservationDTO } from '../dto/reservation.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Reservations')
@Controller('reservation')
export class ReservationController {

    constructor(private reservationService: ReservationService){}

    @ApiOperation({ summary : "Get all reservations currently" })
    @ApiResponse({status : 200, description : "Get all reservations successfully"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth()
    @Get()
    getAll(){
        return this.reservationService.getAll();
    }

    @ApiOperation({ summary : "Get an reservation existing by uuid" })
    @ApiResponse({status : 200, description : "Get an reservation successfully"})
    @ApiResponse({status : 404, description : "Reservation not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth()
    @Get(":id")
    getById(@Param("id", ParseUUIDPipe) id: string){
        return this.reservationService.getById(id);
    }
    
    @ApiOperation({ summary : "Create a new reservation associated with a flight and hotel" })
    @ApiResponse({status : 201, description : "Reservation created successfully"})
    @ApiResponse({status : 404, description : "Flight or hotel not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth(Role.ADMIN)
    @Post()
    create(@Body() body: ReservationDTO){
        return this.reservationService.create(body);
    }

    @ApiOperation({ summary : "Update data about an reservation by uuid" })
    @ApiResponse({status : 200, description : "Reservation updated successfully"})
    @ApiResponse({status : 404, description : "Appointment not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth()
    @Put()
    update(@Body() body: ReservationDTO, @Param("id", ParseUUIDPipe) id: string){
        return this.reservationService.update(body, id);
    }
    
    @ApiOperation({ summary : "Delete a reservation by uuid" })
    @ApiResponse({status : 200, description : "Reservation deleted successfully"})
    @ApiResponse({status : 404, description : "Reservation not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth(Role.ADMIN)
    @Delete()
    delete(@Param("id", ParseUUIDPipe) id: string){
        this.reservationService.delete(id);
    }
}
