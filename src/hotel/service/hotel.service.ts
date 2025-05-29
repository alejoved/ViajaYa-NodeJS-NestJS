import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HotelInterface } from "./hotel.interface";
import { Hotel } from "../entity/hotel.entity";
import { HotelDTO } from "../dto/hotel.dto";
import { HotelResponseDTO } from "../dto/hotel-response.dto";
import { plainToInstance } from "class-transformer";
import { Constants } from "../../common/constants";

@Injectable()
export class HotelService implements HotelInterface {

    private readonly logger = new Logger("HotelService");

    constructor(
        @InjectRepository(Hotel)
        private readonly hotelRepository: Repository<Hotel>,
      ) {}

    async getAll(): Promise<HotelResponseDTO[]> {
        const hotels = await this.hotelRepository.find();
        const hotelResponseDTO = plainToInstance(HotelResponseDTO, hotels, { excludeExtraneousValues: true })
        return hotelResponseDTO;
    }

    async getById(id: string): Promise<HotelResponseDTO> {
        const hotel = await this.hotelRepository.findOne({where: { id }});
        if (!hotel){
            throw new NotFoundException(Constants.hotelNotFound);
        }
        const physicianResponseDTO = plainToInstance(HotelResponseDTO, hotel, { excludeExtraneousValues: true })
        return physicianResponseDTO;
    }

    async getByCountryAndCity(country: string, city: string): Promise<HotelResponseDTO[]> {
        const hotels = await this.hotelRepository.find({where: { country: country, city: city }});
        const hotelResponseDTO = plainToInstance(HotelResponseDTO, hotels, { excludeExtraneousValues: true })
        return hotelResponseDTO;
    }

    async create(hotelDTO: HotelDTO): Promise<HotelResponseDTO> {
        const hotel = plainToInstance(Hotel, hotelDTO, { excludeExtraneousValues: true });
        this.hotelRepository.create(hotel);
        await this.hotelRepository.save(hotel);
        const hotelResponseDTO = plainToInstance(HotelResponseDTO, hotel, { excludeExtraneousValues: true })
        return hotelResponseDTO;
    }

    async update(hotelDTO: HotelDTO, id: string): Promise<HotelResponseDTO> {
        const hotelExists = await this.hotelRepository.findOneBy({id: id});
        if (!hotelExists){
            throw new NotFoundException(Constants.hotelNotFound);
        }
        const hotel = plainToInstance(Hotel, hotelDTO, { excludeExtraneousValues: true })
        hotel.id = id;
        await this.hotelRepository.save(hotel);
        const hotelResponseDTO = plainToInstance(HotelResponseDTO, hotel, { excludeExtraneousValues: true })
        return hotelResponseDTO;
    }

    async delete(id: string): Promise<void> {
        const hotelExists = await this.hotelRepository.findOneBy({id: id});
        if (!hotelExists){
            throw new NotFoundException(Constants.hotelNotFound);
        }
        await this.hotelRepository.delete(hotelExists);
    }

    
}