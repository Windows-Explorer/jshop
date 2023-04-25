import { HttpException, Inject, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { LOGGER_TOKEN } from "../common/constants/inject-tokens.constant"
import { ICategoriesService } from "src/common/interfaces/services/categories.service.interface"
import { ILoggerOutput } from "src/common/interfaces/logger-output.interface"
import { DeleteResult, Not, Repository } from "typeorm"
import { Category } from "./entities/category.entity"
import { notEqual } from "assert"
import { ICategory } from "src/common/interfaces/data/category.interface"

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

    async save(category: ICategory): Promise<ICategory> {
        try {
            const result = await this._categoryRepository.save(category)
            return result
        }
        catch(error) {
            this._logger.log(error, "CATEGORIES-SERVICE: save")
            throw new HttpException(error, 500)
        }
    }

    async deleteAll(): Promise<DeleteResult> {
        try {
            const result = await this._categoryRepository.delete({ id: Not(-1)})
            return result
        }
        catch(error) {
            this._logger.log(error, "CATEGORIES-SERVICE: deleteAll")
            throw new HttpException(error, 500)
        }
    }
}