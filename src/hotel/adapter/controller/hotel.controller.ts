import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe, Inject } from '@nestjs/common';
import { AuthDecorator } from '../../../auth/infrastructure/config/auth.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HotelResponseDto } from '../../application/dto/hotel-response-dto';
import { Role } from '../../../common/role';
import { HotelCreateDto } from '../../application/dto/hotel-create-dto';
import { HotelUpdateDto } from '../../application/dto/hotel-update-dto';
import { HotelGetUseCaseInterface } from '../../application/port/hotel-get-usecase.interface';
import { HotelCreateUseCaseInterface } from '../../application/port/hotel-create-usecase.interface';
import { HotelUpdateUseCaseInterface } from '../../application/port/hotel-update-usecase.interface';
import { HotelDeleteUseCaseInterface } from '../../application/port/hotel-delete-usecase.interface';

@ApiTags('Hotels')
@Controller('hotel')
export class HotelController {
    
    constructor(@Inject("HotelGetUseCaseInterface") private readonly hotelGetUseCaseInterface: HotelGetUseCaseInterface,
                @Inject("HotelCreateUseCaseInterface") private readonly hotelCreateUseCaseInterface: HotelCreateUseCaseInterface,
                @Inject("HotelUpdateUseCaseInterface") private readonly hotelUpdateUseCaseInterface: HotelUpdateUseCaseInterface,
                @Inject("HotelDeleteUseCaseInterface") private readonly hotelDeleteUseCaseInterface: HotelDeleteUseCaseInterface ){}        
    
    @ApiOperation({ summary : "Get all hotels currently" })
    @ApiResponse({status : 200, description : "Get all hotels successfully", type: [HotelResponseDto]})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Get()
    async getAll(){
        const hotelResponseDto = await this.hotelGetUseCaseInterface.execute();
        return hotelResponseDto;
    }

    @ApiOperation({ summary : "Get an hotel existing by uuid" })
    @ApiResponse({status : 200, description : "Get an hotel successfully", type: HotelResponseDto})
    @ApiResponse({status : 404, description : "Hotel not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Get(":id")
    async getById(@Param("id", ParseUUIDPipe) id: string){
        const hotelResponseDto = await this.hotelGetUseCaseInterface.executeById(id);
        return hotelResponseDto;
    }

    @ApiOperation({ summary : "Get an hotel existing by uuid" })
    @ApiResponse({status : 200, description : "Get an hotel successfully", type: HotelResponseDto})
    @ApiResponse({status : 404, description : "Hotel not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Get("/country/:country/city/:city")
    async getByCity(@Param("country") country: string, @Param("city") city: string){
        const hotelResponseDto = await this.hotelGetUseCaseInterface.executeByCountryAndCity(country, city);
        return hotelResponseDto;
    }
    
    @ApiOperation({ summary : "Create a new hotel associated with a name, location, price per night" })
    @ApiResponse({status : 201, description : "Hotel created successfully", type: HotelResponseDto})
    @ApiResponse({status : 409, description : "Hotel already exists"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Post()
    async create(@Body() hotelCreateDto: HotelCreateDto){
        const hotelResponseDto = await this.hotelCreateUseCaseInterface.execute(hotelCreateDto);
        return hotelResponseDto;
    }
    
    @ApiOperation({ summary : "Update data about a hotel by uuid" })
    @ApiResponse({status : 201, description : "Hotel updated successfully", type: HotelResponseDto})
    @ApiResponse({status : 404, description : "Hotel not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Put(":id")
    async update(@Body() hotelUpdateDto: HotelUpdateDto, @Param("id", ParseUUIDPipe) id: string){
        const hotelResponseDto = await this.hotelUpdateUseCaseInterface.execute(hotelUpdateDto, id);
        return hotelResponseDto;
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
