import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReservationResponseDto } from '../dto/reservation-response-dto';
import { ReservationCreateUseCaseInterface } from '../../application/port/reservation-create-usecase.interface';
import { ReservationDeleteUseCaseInterface } from '../../application/port/reservation-delete-usecase.interface';
import { ReservationGetUseCaseInterface } from '../../application/port/reservation-get-usecase.interface';
import { ReservationUpdateUseCaseInterface } from '../../application/port/reservation-update-usecase.interface';
import { ReservationConfirmUseCaseInterface } from '../../application/port/reservation-confirm-usecase.interface';
import { ReservationCancelUseCaseInterface } from '../../application/port/reservation-cancel-usecase.interface';
import { AuthDecorator } from '../../../auth/infrastructure/config/auth.decorator';
import { Role } from '../../../common/role';
import { ReservationCreateDto } from '../dto/reservation-create-dto';
import { ReservationUpdateDto } from '../dto/reservation-update-dto';

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
    @ApiResponse({status : 200, description : "Get all reservations successfully", type: [ReservationResponseDto]})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Get()
    async getAll(){
        const reservationResponseDto = await this.reservationGetUseCaseInterface.execute();
        return reservationResponseDto;
    }

    @ApiOperation({ summary : "Get an reservation existing by uuid" })
    @ApiResponse({status : 200, description : "Get an reservation successfully", type: ReservationResponseDto})
    @ApiResponse({status : 404, description : "Reservation not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Get(":id")
    async getById(@Param("id", ParseUUIDPipe) id: string){
        const reservationResponseDto = await this.reservationGetUseCaseInterface.executeById(id);
        return reservationResponseDto;
    }
    
    @ApiOperation({ summary : "Create a new reservation associated with a flight and hotel" })
    @ApiResponse({status : 201, description : "Reservation created successfully", type: ReservationResponseDto})
    @ApiResponse({status : 404, description : "Flight or hotel not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Post()
    async create(@Body() reservationCreateDto: ReservationCreateDto){
        const reservationResponseDTO = await this.reservationCreateUseCaseInterface.execute(reservationCreateDto);
        return reservationResponseDTO;
    }

    @ApiOperation({ summary : "Update data about an reservation by uuid" })
    @ApiResponse({status : 200, description : "Reservation updated successfully", type: ReservationResponseDto})
    @ApiResponse({status : 404, description : "Appointment not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Put(":id")
    async update(@Body() reservationUpdateDto: ReservationUpdateDto, @Param("id", ParseUUIDPipe) id: string){
        const reservationResponseDto = await this.reservationUpdateUseCaseInterface.execute(reservationUpdateDto, id);
        return reservationResponseDto;
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
