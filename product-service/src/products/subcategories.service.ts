import { HttpException, Inject, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { LOGGER_TOKEN } from "src/common/constants/inject-tokens.constant"
import { ILoggerOutput } from "src/common/interfaces/logger-output.interface"
import { ISubcategoriesService } from "src/common/interfaces/services/subcategories.service.interface"
import { Repository } from "typeorm"
import { Subcategory } from "./entities/subcategory.entity"
import { ISubcategory } from "src/common/interfaces/data/subcategory.interface"

@Injectable()
export class SubcategoriesService implements ISubcategoriesService {
    constructor(
        @InjectRepository(Subcategory) private readonly _subcategoryRepository: Repository<ISubcategory>,
        @Inject(LOGGER_TOKEN) private readonly _logger: ILoggerOutput
    ){}

    async findAll(): Promise<ISubcategory[]> {
        try {
            const result = await this._subcategoryRepository.find({ relations: ["category"]})
            return result
        }
        catch(error) {
            this._logger.log(error, "SUBCATEGORIES-SERVICE: findAll")
            throw new HttpException(error, 500)
        }
    }

}