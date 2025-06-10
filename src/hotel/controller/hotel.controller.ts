import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { HotelDTO } from '../dto/hotel.dto';
import { Role } from '../../common/role';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HotelResponseDTO } from '../dto/hotel-response.dto';
import { HotelService } from '../service/hotel.service';
import { Auth } from '../../auth/infrastructure/config/auth.decorator';

@ApiTags('Hotels')
@Controller('hotel')
export class HotelController {
    
    constructor(private hotelService: HotelService){}        
    
    @ApiOperation({ summary : "Get all hotels currently" })
    @ApiResponse({status : 200, description : "Get all hotels successfully", type: [HotelResponseDTO]})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth()
    @Get()
    getAll(){
        return this.hotelService.getAll();
    }

    @ApiOperation({ summary : "Get an hotel existing by uuid" })
    @ApiResponse({status : 200, description : "Get an hotel successfully", type: HotelResponseDTO})
    @ApiResponse({status : 404, description : "Hotel not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth()
    @Get(":id")
    getById(@Param("id", ParseUUIDPipe) id: string){
        return this.hotelService.getById(id);
    }

    @ApiOperation({ summary : "Get an hotel existing by uuid" })
    @ApiResponse({status : 200, description : "Get an hotel successfully", type: HotelResponseDTO})
    @ApiResponse({status : 404, description : "Hotel not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth()
    @Get("/country/:country/city/:city")
    getByCity(@Param("country") country: string, @Param("city") city: string){
        return this.hotelService.getByCountryAndCity(country, city);
    }
    
    @ApiOperation({ summary : "Create a new hotel associated with a name, location, price per night" })
    @ApiResponse({status : 201, description : "Hotel created successfully", type: HotelResponseDTO})
    @ApiResponse({status : 409, description : "Hotel already exists"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth(Role.ADMIN)
    @Post()
    create(@Body() body: HotelDTO){
        return this.hotelService.create(body);
    }
    
    @ApiOperation({ summary : "Update data about a hotel by uuid" })
    @ApiResponse({status : 201, description : "Hotel updated successfully", type: HotelResponseDTO})
    @ApiResponse({status : 404, description : "Hotel not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth(Role.ADMIN)
    @Put(":id")
    update(@Body() body: HotelDTO, @Param("id", ParseUUIDPipe) id: string){
        return this.hotelService.update(body, id);
    }

    @ApiOperation({ summary : "Delete an hotel by uuid" })
    @ApiResponse({status : 200, description : "Hotel deleted successfully"})
    @ApiResponse({status : 404, description : "Hotel not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Auth(Role.ADMIN)
    @Delete(":id")
    async delete(@Param("id", ParseUUIDPipe) id: string){
        await this.hotelService.delete(id);
    }
}
