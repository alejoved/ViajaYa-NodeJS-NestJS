import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { ReservationResponseDTO } from '../dto/reservation-response.dto';
import { ReservationCreateUseCaseInterface } from '../../../reservation/application/port/reservation-create-usecase.interface';
import { ReservationDeleteUseCaseInterface } from '../../../reservation/application/port/reservation-delete-usecase.interface';
import { ReservationGetUseCaseInterface } from '../../../reservation/application/port/reservation-get-usecase.interface';
import { ReservationUpdateUseCaseInterface } from '../../../reservation/application/port/reservation-update-usecase.interface';
import { AuthDecorator } from '../../../auth/infrastructure/config/auth.decorator';
import { Role } from '../../../common/role';
import { ReservationDTO } from '../dto/reservation.dto';
import { ReservationCreateCommand } from '../../../reservation/application/command/reservation-create-command';
import { ReservationUpdateCommand } from '../../../reservation/application/command/reservation-update-command';
import { ReservationConfirmUseCaseInterface } from '../../../reservation/application/port/reservation-confirm-usecase.interface';
import { ReservationCancelUseCaseInterface } from '../../../reservation/application/port/reservation-cancel-usecase.interface';

@ApiTags('Reservations')
@Controller('reservation')
export class ReservationController {

    constructor(@Inject("ReservationGetUseCaseInterface") private readonly reservationGetUseCaseInterface: ReservationGetUseCaseInterface,
                @Inject("ReservationCreateUseCaseInterface") private readonly reservationCreateUseCaseInterface: ReservationCreateUseCaseInterface,
                @Inject("ReservationUpdateUseCaseInterface") private readonly reservationUpdateUseCaseInterface: ReservationUpdateUseCaseInterface,
                @Inject("ReservationDeleteUseCaseInterface") private readonly reservationDeleteUseCaseInterface: ReservationDeleteUseCaseInterface,
                @Inject("ReservationConfirmUseCaseInterface") private readonly reservationConfirmUseCaseInterface: ReservationConfirmUseCaseInterface,
                @Inject("ReservationCancelUseCaseInterface") private readonly reservationCancelUseCaseInterface: ReservationCancelUseCaseInterface){}

    @ApiOperation({ summary : "Get all reservations currently" })
    @ApiResponse({status : 200, description : "Get all reservations successfully", type: [ReservationResponseDTO]})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Get()
    getAll(){
        const reservationModel = this.reservationGetUseCaseInterface.execute();
        const reservationResponseDTO = plainToInstance(ReservationResponseDTO, reservationModel, {excludeExtraneousValues: true});
        return reservationResponseDTO;
    }

    @ApiOperation({ summary : "Get an reservation existing by uuid" })
    @ApiResponse({status : 200, description : "Get an reservation successfully", type: ReservationResponseDTO})
    @ApiResponse({status : 404, description : "Reservation not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Get(":id")
    getById(@Param("id", ParseUUIDPipe) id: string){
        const reservationModel = this.reservationGetUseCaseInterface.executeById(id);
        const reservationResponseDTO = plainToInstance(ReservationResponseDTO, reservationModel, {excludeExtraneousValues: true});
        return reservationResponseDTO;
    }
    
    @ApiOperation({ summary : "Create a new reservation associated with a flight and hotel" })
    @ApiResponse({status : 201, description : "Reservation created successfully", type: ReservationResponseDTO})
    @ApiResponse({status : 404, description : "Flight or hotel not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Post()
    create(@Body() reservationDTO: ReservationDTO){
        const reservationCreateCommand = plainToInstance(ReservationCreateCommand, reservationDTO);
        const reservationModel = this.reservationCreateUseCaseInterface.execute(reservationCreateCommand);
        const reservationResponseDTO = plainToInstance(ReservationResponseDTO, reservationModel, {excludeExtraneousValues: true});
        return reservationResponseDTO;
    }

    @ApiOperation({ summary : "Update data about an reservation by uuid" })
    @ApiResponse({status : 200, description : "Reservation updated successfully", type: ReservationResponseDTO})
    @ApiResponse({status : 404, description : "Appointment not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Put(":id")
    update(@Body() reservationDTO: ReservationDTO, @Param("id", ParseUUIDPipe) id: string){
        const reservationUpdateCommand = plainToInstance(ReservationUpdateCommand, reservationDTO);
        const reservationModel = this.reservationUpdateUseCaseInterface.execute(reservationUpdateCommand, id);
        const reservationResponseDTO = plainToInstance(ReservationResponseDTO, reservationModel, {excludeExtraneousValues: true});
        return reservationResponseDTO;
    }
    
    @ApiOperation({ summary : "Delete a reservation by uuid" })
    @ApiResponse({status : 200, description : "Reservation deleted successfully"})
    @ApiResponse({status : 404, description : "Reservation not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Delete(":id")
    async delete(@Param("id", ParseUUIDPipe) id: string){
        await this.reservationDeleteUseCaseInterface.execute(id);
    }

    @ApiOperation({ summary : "Confirm a reservation by uuid" })
    @ApiResponse({status : 200, description : "Reservation confirmed successfully"})
    @ApiResponse({status : 404, description : "Reservation not found"})
    @ApiResponse({status : 409, description : "Reservation canceled"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Get("/confirm/:id")
    async confirm(@Param("id", ParseUUIDPipe) id: string){
        await this.reservationConfirmUseCaseInterface.execute(id);
    }

    @ApiOperation({ summary : "Cancel a reservation by uuid" })
    @ApiResponse({status : 200, description : "Reservation canceled successfully"})
    @ApiResponse({status : 404, description : "Reservation not found"})
    @ApiResponse({status : 409, description : "Reservation confirmed"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Get("/cancel/:id")
    async cancel(@Param("id", ParseUUIDPipe) id: string){
        await this.reservationCancelUseCaseInterface.execute(id);
    }
}
