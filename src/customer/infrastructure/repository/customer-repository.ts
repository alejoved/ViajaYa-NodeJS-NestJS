import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomerRepositoryInterface } from "../../../customer/domain/repository/customer-repository.interface";
import { CustomerEntity } from "../entity/customer-entity";

@Injectable()
export class CustomerRepository implements CustomerRepositoryInterface {

    private readonly logger = new Logger("CustomerRepository");

    constructor(
        @InjectRepository(CustomerEntity)
        private readonly customerRepository: Repository<CustomerEntity>,
      ) {}

    async get(): Promise<CustomerEntity[]>{
        return await this.customerRepository.find({relations: ['authEntity']});
    }

    async getById(id: string): Promise<CustomerEntity | null>{
        return await this.customerRepository.findOneBy({id: id});
    }

    async getByEmail(email: string): Promise<CustomerEntity | null>{
        return await this.customerRepository.findOne({where: { authEntity: {email: email}}, relations: ['authEntity']});
    }

    async create(customerEntity: CustomerEntity): Promise<CustomerEntity>{
        this.customerRepository.create(customerEntity);
        return await this.customerRepository.save(customerEntity);
    }

    async update(customerEntity: CustomerEntity): Promise<CustomerEntity>{
        return await this.customerRepository.save(customerEntity);
    }

    async delete(customerEntity: CustomerEntity): Promise<void>{
        await this.customerRepository.delete(customerEntity);
    }
}