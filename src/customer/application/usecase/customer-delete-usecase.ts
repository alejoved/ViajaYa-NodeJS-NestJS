import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CustomerRepositoryInterface } from "../../domain/repository/customer-repository.interface";
import { CustomerDeleteUseCaseInterface } from "../interface/customer-delete-usecase.interface";
import { Constants } from "../../../common/constants";

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