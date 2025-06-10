import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CustomerRepositoryInterface } from "../../../customer/domain/repository/customer-repository.interface";
import { CustomerDeleteUseCaseInterface } from "../port/customer-delete-usecase.interface";
import { Constants } from "src/common/constants";

@Injectable()
export class CustomerDeleteUseCase implements CustomerDeleteUseCaseInterface {

    private readonly logger = new Logger("AuthService");

    constructor(
        @Inject('CustomerRepositoryInterface')
        private readonly customerRepositoryInterface: CustomerRepositoryInterface
      ) {}

    async execute(id: string): Promise<void>{
        const customer = await this.customerRepositoryInterface.getById(id);
        if (!customer){
            throw new NotFoundException(Constants.customerNotFound);
        }
        await this.customerRepositoryInterface.delete(customer);
    }
}