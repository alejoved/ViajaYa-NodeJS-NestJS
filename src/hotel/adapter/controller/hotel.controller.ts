import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe, Inject } from '@nestjs/common';
import { AuthDecorator } from '../../../auth/infrastructure/config/auth.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HotelResponseDto } from '../dto/hotel-response.dto';
import { Role } from '../../../common/role';
import { HotelDto } from '../dto/hotel.dto';
import { HotelGetUseCaseInterface } from '../../application/port/hotel-get-usecase.interface';
import { HotelCreateUseCaseInterface } from '../../application/port/hotel-create-usecase.interface';
import { HotelUpdateUseCaseInterface } from '../../application/port/hotel-update-usecase.interface';
import { HotelDeleteUseCaseInterface } from '../../application/port/hotel-delete-usecase.interface';
import { HotelRestMapper } from '../mapper/hotel-rest-mapper';

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
        const hotelModel = await this.hotelGetUseCaseInterface.execute();
        const hotelResponseDTO = hotelModel.map(HotelRestMapper.modelToDto);
        return hotelResponseDTO;
    }

    @ApiOperation({ summary : "Get an hotel existing by uuid" })
    @ApiResponse({status : 200, description : "Get an hotel successfully", type: HotelResponseDto})
    @ApiResponse({status : 404, description : "Hotel not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Get(":id")
    async getById(@Param("id", ParseUUIDPipe) id: string){
        const hotelModel = await this.hotelGetUseCaseInterface.executeById(id);
        const hotelResponseDTO = HotelRestMapper.modelToDto(hotelModel);
        return hotelResponseDTO;
    }

    @ApiOperation({ summary : "Get an hotel existing by uuid" })
    @ApiResponse({status : 200, description : "Get an hotel successfully", type: HotelResponseDto})
    @ApiResponse({status : 404, description : "Hotel not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator()
    @Get("/country/:country/city/:city")
    async getByCity(@Param("country") country: string, @Param("city") city: string){
        const hotelModel = await this.hotelGetUseCaseInterface.executeByCountryAndCity(country, city);
        const hotelResponseDTO = hotelModel.map(HotelRestMapper.modelToDto);
        return hotelResponseDTO;
    }
    
    @ApiOperation({ summary : "Create a new hotel associated with a name, location, price per night" })
    @ApiResponse({status : 201, description : "Hotel created successfully", type: HotelResponseDto})
    @ApiResponse({status : 409, description : "Hotel already exists"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Post()
    async create(@Body() hotelDTO: HotelDto){
        const hotelModel = HotelRestMapper.dtoToModel(hotelDTO);
        const response = await this.hotelCreateUseCaseInterface.execute(hotelModel);
        const hotelResponseDTO = HotelRestMapper.modelToDto(response); 
        return hotelResponseDTO;
    }
    
    @ApiOperation({ summary : "Update data about a hotel by uuid" })
    @ApiResponse({status : 201, description : "Hotel updated successfully", type: HotelResponseDto})
    @ApiResponse({status : 404, description : "Hotel not found"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @AuthDecorator(Role.ADMIN)
    @Put(":id")
    async update(@Body() hotelDTO: HotelDto, @Param("id", ParseUUIDPipe) id: string){
        const hotelModel = HotelRestMapper.dtoToModel(hotelDTO);
        const response = await this.hotelUpdateUseCaseInterface.execute(hotelModel, id);
        const hotelResponseDTO = HotelRestMapper.modelToDto(response);
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
