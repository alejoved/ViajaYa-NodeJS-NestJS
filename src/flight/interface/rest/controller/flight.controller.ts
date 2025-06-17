import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../../../../auth/infrastructure/config/auth.decorator';
import { FlightResponseDTO } from '../dto/fligth-response-dto';
import { Role } from '../../../../common/role';
import { FlightDTO } from '../dto/fligth-dto';
import { FlightGetUseCaseInterface } from '../../../application/port/flight-get-usecase.interface';
import { FlightCreateUseCaseInterface } from '../../../application/port/flight-create-usecase.interface';
import { FlightUpdateUseCaseInterface } from '../../../application/port/flight-update-usecase.interface';
import { FlightDeleteUseCaseInterface } from '../../../application/port/flight-delete-usecase.interface';
import { FlightMapper } from '../../../application/mapper/flight-mapper';

@ApiTags('Flights')
@Controller('flight')
export class FlightController {
    constructor(@Inject("FlightGetUseCaseInterface") private readonly flightGetUseCaseInterface: FlightGetUseCaseInterface,
                @Inject("FlightCreateUseCaseInterface") private readonly flightCreateUseCaseInterface: FlightCreateUseCaseInterface,
                @Inject("FlightUpdateUseCaseInterface") private readonly flightUpdateUseCaseInterface: FlightUpdateUseCaseInterface,
                @Inject("FlightDeleteUseCaseInterface") private readonly flightDeleteUseCaseInterface: FlightDeleteUseCaseInterface ){} 

    @ApiOperation({ summary : "Get all flights currently" })
    @ApiResponse({status : 200, description : "Get all flights successfully", type: [FlightResponseDTO]})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Get()
    async getAll(){
        const flightModel = this.flightGetUseCaseInterface.execute();
        const flightResponseDTO = (await flightModel).map(FlightMapper.modelToDto);
        return flightResponseDTO;
    }

    @ApiOperation({ summary : "Get an flight existing by uuid" })
    @ApiResponse({status : 200, description : "Get an flight successfully", type: FlightResponseDTO})
    @ApiResponse({status : 404, description : "Flight not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Get(":id")
    async getById(@Param("id", ParseUUIDPipe) id: string){
        const flightModel = await this.flightGetUseCaseInterface.executeById(id);
        const flightResponseDTO = FlightMapper.modelToDto(flightModel);
        return flightResponseDTO;
    }

    @ApiOperation({ summary : "Get an flight by origin and destiny" })
    @ApiResponse({status : 200, description : "Get an flight successfully", type: FlightResponseDTO})
    @ApiResponse({status : 404, description : "Flight not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Get("/origin/:origin/destiny/:destiny")
    async getByOriginAndDestiny(@Param("origin") origin: string, @Param("destiny") destiny: string ){
        const flightModel = await this.flightGetUseCaseInterface.executeByOriginAndDestiny(origin, destiny);
        const flightResponseDTO = flightModel.map(FlightMapper.modelToDto);
        return flightResponseDTO;
    }
    
    @ApiOperation({ summary : "Create a new flight associated with a origin and destiny" })
    @ApiResponse({status : 201, description : "Flight created successfully", type: FlightResponseDTO})
    @ApiResponse({status : 409, description : "Flight already exists"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Post()
    async create(@Body() flightDTO: FlightDTO){
        const flightModel = FlightMapper.dtoToModel(flightDTO);
        const response = await this.flightCreateUseCaseInterface.execute(flightModel);
        const flightResponseDTO = FlightMapper.modelToDto(response);
        return flightResponseDTO;
    }

    @ApiOperation({ summary : "Update data about a flight by uuid" })
    @ApiResponse({status : 201, description : "Flight updated successfully", type: FlightResponseDTO})
    @ApiResponse({status : 404, description : "Flight not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Put(":id")
    async update(@Body() flightDTO: FlightDTO, @Param("id", ParseUUIDPipe) id: string){
        const flightModel = FlightMapper.dtoToModel(flightDTO);
        const response = await this.flightUpdateUseCaseInterface.execute(flightModel, id);
        const flightResponseDTO = FlightMapper.modelToDto(response);
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
