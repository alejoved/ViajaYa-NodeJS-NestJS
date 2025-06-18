import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomerRepositoryInterface } from "../../domain/repository/customer-repository.interface";
import { Customer } from "../entity/customer";
import { Constants } from "../../../common/constants";
import { CustomerModel } from "../../domain/model/customer-model";
import { CustomerMapper } from "../mapper/customer-mapper";

@Injectable()
export class CustomerRepository implements CustomerRepositoryInterface {

    private readonly logger = new Logger("CustomerRepository");

    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
      ) {}

    async get(): Promise<CustomerModel[]>{
        const customer = await this.customerRepository.find({relations: ['auth']});
        return customer.map(CustomerMapper.entityToModel);
    }

    async getById(id: string): Promise<CustomerModel>{
        const customer = await this.customerRepository.findOneBy({id: id});
        if(!customer){
            throw new NotFoundException(Constants.customerNotFound);
        }
        return CustomerMapper.entityToModel(customer);
    }

    async getByEmail(email: string): Promise<CustomerModel>{
        const customer = await this.customerRepository.findOne({where: { auth: {email: email}}, relations: ['auth']});
        if(!customer){
            throw new NotFoundException(Constants.customerNotFound);
        }
        return CustomerMapper.entityToModel(customer);
    }

    async create(customerModel: CustomerModel): Promise<CustomerModel>{
        const customer = CustomerMapper.modelToEntity(customerModel);
        this.customerRepository.create(customer);
        const response = await this.customerRepository.save(customer);
        return CustomerMapper.entityToModel(response);
    }

    async update(customerModel: CustomerModel): Promise<CustomerModel>{
        const customer = CustomerMapper.modelToEntity(customerModel);
        const response = await this.customerRepository.save(customer);
        return CustomerMapper.entityToModel(response);
    }

    async delete(id: string): Promise<void>{
        const customer = await this.customerRepository.findOneBy({id: id});
        if(!customer){
            throw new NotFoundException(Constants.customerNotFound);
        }
        await this.customerRepository.delete(customer);
    }
}