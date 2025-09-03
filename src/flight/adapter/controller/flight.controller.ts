import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../../../auth/infrastructure/config/auth.decorator';
import { FlightResponseDto } from '../../application/dto/fligth-response-dto';
import { Role } from '../../../common/role';
import { FlightCreateDto } from '../../application/dto/fligth-create-dto';
import { FlightUpdateDto } from '../../application/dto/fligth-update-dto';
import { FlightGetUseCaseInterface } from '../../application/port/flight-get-usecase.interface';
import { FlightCreateUseCaseInterface } from '../../application/port/flight-create-usecase.interface';
import { FlightUpdateUseCaseInterface } from '../../application/port/flight-update-usecase.interface';
import { FlightDeleteUseCaseInterface } from '../../application/port/flight-delete-usecase.interface';

@ApiTags('Flights')
@Controller('flight')
export class FlightController {
    constructor(@Inject("FlightGetUseCaseInterface") private readonly flightGetUseCaseInterface: FlightGetUseCaseInterface,
                @Inject("FlightCreateUseCaseInterface") private readonly flightCreateUseCaseInterface: FlightCreateUseCaseInterface,
                @Inject("FlightUpdateUseCaseInterface") private readonly flightUpdateUseCaseInterface: FlightUpdateUseCaseInterface,
                @Inject("FlightDeleteUseCaseInterface") private readonly flightDeleteUseCaseInterface: FlightDeleteUseCaseInterface ){} 

    @ApiOperation({ summary : "Get all flights currently" })
    @ApiResponse({status : 200, description : "Get all flights successfully", type: [FlightResponseDto]})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Get()
    async getAll(){
        const flightResponseDto = this.flightGetUseCaseInterface.execute();
        return flightResponseDto;
    }

    @ApiOperation({ summary : "Get an flight existing by uuid" })
    @ApiResponse({status : 200, description : "Get an flight successfully", type: FlightResponseDto})
    @ApiResponse({status : 404, description : "Flight not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Get(":id")
    async getById(@Param("id", ParseUUIDPipe) id: string){
        const flightResponseDto = await this.flightGetUseCaseInterface.executeById(id);
        return flightResponseDto;
    }

    @ApiOperation({ summary : "Get an flight by origin and destiny" })
    @ApiResponse({status : 200, description : "Get an flight successfully", type: FlightResponseDto})
    @ApiResponse({status : 404, description : "Flight not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Get("/origin/:origin/destiny/:destiny")
    async getByOriginAndDestiny(@Param("origin") origin: string, @Param("destiny") destiny: string ){
        const flightResponseDto = await this.flightGetUseCaseInterface.executeByOriginAndDestiny(origin, destiny);
        return flightResponseDto;
    }
    
    @ApiOperation({ summary : "Create a new flight associated with a origin and destiny" })
    @ApiResponse({status : 201, description : "Flight created successfully", type: FlightResponseDto})
    @ApiResponse({status : 409, description : "Flight already exists"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Post()
    async create(@Body() flightCreateDto: FlightCreateDto){
        const flightResponseDto = await this.flightCreateUseCaseInterface.execute(flightCreateDto);
        return flightResponseDto;
    }

    @ApiOperation({ summary : "Update data about a flight by uuid" })
    @ApiResponse({status : 201, description : "Flight updated successfully", type: FlightResponseDto})
    @ApiResponse({status : 404, description : "Flight not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Put(":id")
    async update(@Body() flightUpdateDto: FlightUpdateDto, @Param("id", ParseUUIDPipe) id: string){
        const flightResponseDto = await this.flightUpdateUseCaseInterface.execute(flightUpdateDto, id);
        return flightResponseDto;
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
