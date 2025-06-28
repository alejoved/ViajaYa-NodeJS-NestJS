import { Inject, Injectable, Logger } from "@nestjs/common";
import { CustomerRepositoryInterface } from "../../domain/repository/customer-repository.interface";
import { CustomerDeleteUseCaseInterface } from "../port/customer-delete-usecase.interface";

@Injectable()
export class CustomerDeleteUseCase implements CustomerDeleteUseCaseInterface {

    private readonly logger = new Logger("CustomerDeleteUseCase");

    constructor(
        @Inject('CustomerRepositoryInterface')
        private readonly customerRepositoryInterface: CustomerRepositoryInterface
      ) {}

    async execute(id: string): Promise<void>{
        await this.customerRepositoryInterface.delete(id);
    }
}