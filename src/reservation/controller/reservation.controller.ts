import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ReservationService } from '../service/reservation.service';
import { Role } from '../../common/role';
import { ReservationDTO } from '../dto/reservation.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReservationResponseDTO } from '../dto/reservation-response.dto';
import { Auth } from '../../auth/infrastructure/config/auth.decorator';

@ApiTags('Reservations')
@Controller('reservation')
export class ReservationController {

    constructor(private reservationService: ReservationService){}

    @ApiOperation({ summary : "Get all reservations currently" })
    @ApiResponse({status : 200, description : "Get all reservations successfully", type: [ReservationResponseDTO]})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth()
    @Get()
    getAll(){
        return this.reservationService.getAll();
    }

    @ApiOperation({ summary : "Get an reservation existing by uuid" })
    @ApiResponse({status : 200, description : "Get an reservation successfully", type: ReservationResponseDTO})
    @ApiResponse({status : 404, description : "Reservation not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth()
    @Get(":id")
    getById(@Param("id", ParseUUIDPipe) id: string){
        return this.reservationService.getById(id);
    }
    
    @ApiOperation({ summary : "Create a new reservation associated with a flight and hotel" })
    @ApiResponse({status : 201, description : "Reservation created successfully", type: ReservationResponseDTO})
    @ApiResponse({status : 404, description : "Flight or hotel not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth(Role.ADMIN)
    @Post()
    create(@Body() body: ReservationDTO){
        return this.reservationService.create(body);
    }

    @ApiOperation({ summary : "Update data about an reservation by uuid" })
    @ApiResponse({status : 200, description : "Reservation updated successfully", type: ReservationResponseDTO})
    @ApiResponse({status : 404, description : "Appointment not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth(Role.ADMIN)
    @Put(":id")
    update(@Body() body: ReservationDTO, @Param("id", ParseUUIDPipe) id: string){
        return this.reservationService.update(body, id);
    }
    
    @ApiOperation({ summary : "Delete a reservation by uuid" })
    @ApiResponse({status : 200, description : "Reservation deleted successfully"})
    @ApiResponse({status : 404, description : "Reservation not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth(Role.ADMIN)
    @Delete(":id")
    async delete(@Param("id", ParseUUIDPipe) id: string){
        await this.reservationService.delete(id);
    }

    @ApiOperation({ summary : "Confirm a reservation by uuid" })
    @ApiResponse({status : 200, description : "Reservation confirmed successfully"})
    @ApiResponse({status : 404, description : "Reservation not found"})
    @ApiResponse({status : 409, description : "Reservation canceled"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth(Role.ADMIN)
    @Get("/confirm/:id")
    async confirm(@Param("id", ParseUUIDPipe) id: string){
        await this.reservationService.confirm(id);
    }

    @ApiOperation({ summary : "Cancel a reservation by uuid" })
    @ApiResponse({status : 200, description : "Reservation canceled successfully"})
    @ApiResponse({status : 404, description : "Reservation not found"})
    @ApiResponse({status : 409, description : "Reservation confirmed"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth(Role.ADMIN)
    @Get("/cancel/:id")
    async cancel(@Param("id", ParseUUIDPipe) id: string){
        await this.reservationService.cancel(id);
    }
}
