import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomerRepositoryInterface } from "../../../customer/domain/repository/customer-repository.interface";
import { Customer } from "../model/customer";

@Injectable()
export class CustomerRepository implements CustomerRepositoryInterface {

    private readonly logger = new Logger("CustomerRepository");

    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
      ) {}

    async get(): Promise<Customer[]>{
        return await this.customerRepository.find();
    }

    async getById(id: string): Promise<Customer | null>{
        return await this.customerRepository.findOneBy({id: id});
    }

    async getByEmail(email: string): Promise<Customer | null>{
        return await this.customerRepository.findOne({where: { auth: {email: email}}, relations: ['authModel']});
    }

    async create(customer: Customer): Promise<Customer>{
        this.customerRepository.create(customer);
        return await this.customerRepository.save(customer);
    }

    async update(customer: Customer): Promise<Customer>{
        return await this.customerRepository.save(customer);
    }

    async delete(customer: Customer): Promise<void>{
        await this.customerRepository.delete(customer);
    }
}