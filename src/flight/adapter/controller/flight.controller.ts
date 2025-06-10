import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../../../auth/infrastructure/config/auth.decorator';
import { plainToInstance } from 'class-transformer';
import { FlightResponseDTO } from '../dto/fligth-response-dto';
import { Role } from '../../../common/role';
import { FlightDTO } from '../dto/fligth-dto';
import { FlightCreateCommand } from '../../../flight/application/command/flight-create-command';
import { FlightUpdateCommand } from '../../../flight/application/command/flight-update-command';
import { FlightGetUseCaseInterface } from 'src/flight/application/port/flight-get-usecase.interface';
import { FlightCreateUseCaseInterface } from '../../../flight/application/port/flight-create-usecase.interface';
import { FlightUpdateUseCaseInterface } from '../../../flight/application/port/flight-update-usecase.interface';
import { FlightDeleteUseCaseInterface } from '../../../flight/application/port/flight-delete-usecase.interface';

@ApiTags('Flights')
@Controller('flight')
export class FlightController {
    constructor(@Inject("FlightGetUseCaseInterface") private readonly flightGetUseCaseInterface: FlightGetUseCaseInterface,
                @Inject("FlightCreateUseCaseInterface") private readonly flightCreateUseCaseInterface: FlightCreateUseCaseInterface,
                @Inject("FlightUpdateUseCaseInterface") private readonly flightUpdateUseCaseInterface: FlightUpdateUseCaseInterface,
                @Inject("FlightDeleteUseCaseInterface") private readonly flightDeleteUseCaseInterface: FlightDeleteUseCaseInterface, ){} 

    @ApiOperation({ summary : "Get all flights currently" })
    @ApiResponse({status : 200, description : "Get all flights successfully", type: [FlightResponseDTO]})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Get()
    getAll(){
        const flightModel = this.flightGetUseCaseInterface.execute();
        const flightResponseDTO = plainToInstance(FlightResponseDTO, flightModel, {excludeExtraneousValues: true});
        return flightResponseDTO;
    }

    @ApiOperation({ summary : "Get an flight existing by uuid" })
    @ApiResponse({status : 200, description : "Get an flight successfully", type: FlightResponseDTO})
    @ApiResponse({status : 404, description : "Flight not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Get(":id")
    getById(@Param("id", ParseUUIDPipe) id: string){
        const flightModel = this.flightGetUseCaseInterface.executeById(id);
        const flightResponseDTO = plainToInstance(FlightResponseDTO, flightModel, {excludeExtraneousValues: true});
        return flightResponseDTO;
    }

    @ApiOperation({ summary : "Get an flight by origin and destiny" })
    @ApiResponse({status : 200, description : "Get an flight successfully", type: FlightResponseDTO})
    @ApiResponse({status : 404, description : "Flight not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Get("/origin/:origin/destiny/:destiny")
    getByOriginAndDestiny(@Param("origin") origin: string, @Param("destiny") destiny: string ){
        const flightModel = this.flightGetUseCaseInterface.executeByOriginAndDestiny(origin, destiny);
        const flightResponseDTO = plainToInstance(FlightResponseDTO, flightModel, {excludeExtraneousValues: true});
        return flightResponseDTO;
    }
    
    @ApiOperation({ summary : "Create a new flight associated with a origin and destiny" })
    @ApiResponse({status : 201, description : "Flight created successfully", type: FlightResponseDTO})
    @ApiResponse({status : 409, description : "Flight already exists"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Post()
    create(@Body() flightDTO: FlightDTO){
        const flightCreateCommand = plainToInstance(FlightCreateCommand, flightDTO, {excludeExtraneousValues: true});
        const flightModel = this.flightCreateUseCaseInterface.execute(flightCreateCommand);
        const flightResponseDTO = plainToInstance(FlightResponseDTO, flightModel, {excludeExtraneousValues: true});
        return flightResponseDTO;
    }

    @ApiOperation({ summary : "Update data about a flight by uuid" })
    @ApiResponse({status : 201, description : "Flight updated successfully", type: FlightResponseDTO})
    @ApiResponse({status : 404, description : "Flight not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Put(":id")
    update(@Body() flightDTO: FlightDTO, @Param("id", ParseUUIDPipe) id: string){
        const flightUpdateCommand = plainToInstance(FlightUpdateCommand, flightDTO, {excludeExtraneousValues: true});
        const flightModel = this.flightUpdateUseCaseInterface.execute(flightUpdateCommand, id);
        const flightResponseDTO = plainToInstance(FlightResponseDTO, flightModel, {excludeExtraneousValues: true});
        return flightResponseDTO;
    }
    
    @ApiOperation({ summary : "Delete an flight by uuid" })
    @ApiResponse({status : 201, description : "Flight deleted successfully"})
    @ApiResponse({status : 404, description : "Flight not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Delete(":id")
    async delete(@Param("id", ParseUUIDPipe) id: string){
        await this.flightDeleteUseCaseInterface.execute(id);
    }
}
