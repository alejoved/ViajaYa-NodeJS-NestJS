import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe, Inject } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AuthDecorator } from '../../../auth/infrastructure/config/auth.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HotelResponseDTO } from '../dto/hotel-response.dto';
import { Role } from '../../../common/role';
import { HotelDTO } from '../dto/hotel.dto';
import { HotelCreateCommand } from '../../../hotel/application/command/hotel-create-command';
import { HotelUpdateCommand } from '../../../hotel/application/command/hotel-update-command';
import { HotelGetUseCaseInterface } from '../../../hotel/application/port/hotel-get-usecase.interface';
import { HotelCreateUseCaseInterface } from '../../../hotel/application/port/hotel-create-usecase.interface';
import { HotelUpdateUseCaseInterface } from '../../../hotel/application/port/hotel-update-usecase.interface';
import { HotelDeleteUseCaseInterface } from '../../../hotel/application/port/hotel-delete-usecase.interface';

@ApiTags('Hotels')
@Controller('hotel')
export class HotelController {
    
    constructor(@Inject("HotelGetUseCaseInterface") private readonly hotelGetUseCaseInterface: HotelGetUseCaseInterface,
                @Inject("HotelCreateUseCaseInterface") private readonly hotelCreateUseCaseInterface: HotelCreateUseCaseInterface,
                @Inject("HotelUpdateUseCaseInterface") private readonly hotelUpdateUseCaseInterface: HotelUpdateUseCaseInterface,
                @Inject("HotelDeleteUseCaseInterface") private readonly hotelDeleteUseCaseInterface: HotelDeleteUseCaseInterface ){}        
    
    @ApiOperation({ summary : "Get all hotels currently" })
    @ApiResponse({status : 200, description : "Get all hotels successfully", type: [HotelResponseDTO]})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Get()
    getAll(){
        const hotelModel = this.hotelGetUseCaseInterface.execute();
        const hotelResponseDTO = plainToInstance(HotelResponseDTO, hotelModel, {excludeExtraneousValues: true});
        return hotelResponseDTO;
    }

    @ApiOperation({ summary : "Get an hotel existing by uuid" })
    @ApiResponse({status : 200, description : "Get an hotel successfully", type: HotelResponseDTO})
    @ApiResponse({status : 404, description : "Hotel not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Get(":id")
    getById(@Param("id", ParseUUIDPipe) id: string){
        const hotelModel = this.hotelGetUseCaseInterface.executeById(id);
        const hotelResponseDTO = plainToInstance(HotelResponseDTO, hotelModel, {excludeExtraneousValues: true});
        return hotelResponseDTO;
    }

    @ApiOperation({ summary : "Get an hotel existing by uuid" })
    @ApiResponse({status : 200, description : "Get an hotel successfully", type: HotelResponseDTO})
    @ApiResponse({status : 404, description : "Hotel not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Get("/country/:country/city/:city")
    getByCity(@Param("country") country: string, @Param("city") city: string){
        const hotelModel = this.hotelGetUseCaseInterface.executeByCountryAndCity(country, city);
        const hotelResponseDTO = plainToInstance(HotelResponseDTO, hotelModel, {excludeExtraneousValues: true});
        return hotelResponseDTO;
    }
    
    @ApiOperation({ summary : "Create a new hotel associated with a name, location, price per night" })
    @ApiResponse({status : 201, description : "Hotel created successfully", type: HotelResponseDTO})
    @ApiResponse({status : 409, description : "Hotel already exists"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Post()
    create(@Body() hotelDTO: HotelDTO){
        const hotelCreateCommand = plainToInstance(HotelCreateCommand, hotelDTO, {excludeExtraneousValues: true});
        const hotelModel = this.hotelCreateUseCaseInterface.execute(hotelCreateCommand);
        const hotelResponseDTO = plainToInstance(HotelResponseDTO, hotelModel, {excludeExtraneousValues: true});
        return hotelResponseDTO;
    }
    
    @ApiOperation({ summary : "Update data about a hotel by uuid" })
    @ApiResponse({status : 201, description : "Hotel updated successfully", type: HotelResponseDTO})
    @ApiResponse({status : 404, description : "Hotel not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Put(":id")
    update(@Body() hotelDTO: HotelDTO, @Param("id", ParseUUIDPipe) id: string){
        const hotelUpdateCommand = plainToInstance(HotelUpdateCommand, hotelDTO, {excludeExtraneousValues: true});
        const hotelModel = this.hotelUpdateUseCaseInterface.execute(hotelUpdateCommand, id);
        const hotelResponseDTO = plainToInstance(HotelResponseDTO, hotelModel, {excludeExtraneousValues: true});
        return hotelResponseDTO;
    }

    @ApiOperation({ summary : "Delete an hotel by uuid" })
    @ApiResponse({status : 200, description : "Hotel deleted successfully"})
    @ApiResponse({status : 404, description : "Hotel not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Delete(":id")
    async delete(@Param("id", ParseUUIDPipe) id: string){
        await this.hotelDeleteUseCaseInterface.execute(id);
    }
}
