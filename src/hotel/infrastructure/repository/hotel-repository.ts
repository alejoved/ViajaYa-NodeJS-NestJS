import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HotelRepositoryInterface } from "../../domain/repository/hotel-repository.interface";
import { Hotel } from "../entity/hotel";

@Injectable()
export class HotelRepository implements HotelRepositoryInterface {

    private readonly logger = new Logger("HotelRepository");

    constructor(
        @InjectRepository(Hotel)
        private readonly hotelRepository: Repository<Hotel>,
      ) {}

    async get(): Promise<Hotel[]>{
        return await this.hotelRepository.find();
    }

    async getById(id: string): Promise<Hotel | null>{
        return await this.hotelRepository.findOneBy({id: id});
    }

    async getByCountryAndCity(country: string, city: string): Promise<Hotel[]>{
        return await this.hotelRepository.findBy({country: country, city: city});
    }

    async create(hotel: Hotel): Promise<Hotel>{
        this.hotelRepository.create(hotel);
        return await this.hotelRepository.save(hotel);
    }

    async update(hotel: Hotel): Promise<Hotel>{
        return await this.hotelRepository.save(hotel);
    }

    async delete(hotel: Hotel): Promise<void>{
        await this.hotelRepository.delete(hotel);
    }
}