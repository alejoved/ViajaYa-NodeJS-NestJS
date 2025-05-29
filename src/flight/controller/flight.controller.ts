import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { FlightService } from '../service/flight.service';
import { Auth } from '../../config/auth.decorator';
import { Role } from '../../common/role';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FlightDTO } from '../dto/fligth.dto';
import { FlightResponseDTO } from '../dto/fligth-response.dto';

@ApiTags('Flights')
@Controller('flight')
export class FlightController {
    constructor(private flightService: FlightService){
        
    }

    @ApiOperation({ summary : "Get all flights currently" })
    @ApiResponse({status : 200, description : "Get all flights successfully", type: [FlightResponseDTO]})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth()
    @Get()
    getAll(){
        return this.flightService.getAll();
    }

    @ApiOperation({ summary : "Get an flight existing by uuid" })
    @ApiResponse({status : 200, description : "Get an flight successfully", type: FlightResponseDTO})
    @ApiResponse({status : 404, description : "Flight not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth()
    @Get(":id")
    getById(@Param("id", ParseUUIDPipe) id: string){
        return this.flightService.getById(id);
    }
    
    @ApiOperation({ summary : "Create a new flight associated with a origin and destiny" })
    @ApiResponse({status : 201, description : "Flight created successfully", type: FlightResponseDTO})
    @ApiResponse({status : 409, description : "Flight already exists"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth(Role.ADMIN)
    @Post()
    create(@Body() body: FlightDTO){
        return this.flightService.create(body);
    }

    @ApiOperation({ summary : "Update data about a flight by uuid" })
    @ApiResponse({status : 201, description : "Flight updated successfully", type: FlightResponseDTO})
    @ApiResponse({status : 404, description : "Flight not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth(Role.ADMIN)
    @Put(":id")
    update(@Body() body: FlightDTO, @Param("id", ParseUUIDPipe) id: string){
        return this.flightService.update(body, id);
    }
    
    @ApiOperation({ summary : "Delete an flight by uuid" })
    @ApiResponse({status : 201, description : "Flight deleted successfully"})
    @ApiResponse({status : 404, description : "Flight not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth(Role.ADMIN)
    @Delete(":id")
    delete(@Param("id", ParseUUIDPipe) id: string){
        this.flightService.delete(id);
    }
}
