import { HttpException, Inject, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { LOGGER_TOKEN } from "src/common/constants/inject-tokens.constant"
import { ICategoriesService } from "src/common/interfaces/categories.service.interface"
import { ICategory } from "src/common/interfaces/category.interface"
import { ILoggerOutput } from "src/common/interfaces/logger-output.interface"
import { Repository } from "typeorm"
import { Category } from "./entities/category.entity"

@Injectable()
export class CategoriesService implements ICategoriesService {
    constructor(
        @InjectRepository(Category) private readonly _categoryRepository: Repository<ICategory>,
        @Inject(LOGGER_TOKEN) private readonly _logger: ILoggerOutput
    ){}

    async findAll(): Promise<ICategory[]> {
        try {
            const result = await this._categoryRepository.find({ relations: ["subcategories"]})
            return result
        }
        catch(error) {
            this._logger.log(error, "CATEGORIES-SERVICE: findAll")
            throw new HttpException(error, 500)
        }
    }

}