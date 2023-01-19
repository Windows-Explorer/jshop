import { InjectRepository } from "@nestjs/typeorm"
import { IColor } from "src/common/interfaces/color.interface"
import { IColorsService } from "src/common/interfaces/colors.service.interface"
import { Repository } from "typeorm"
import { Color } from "./entities/color.entity"

export class ColorsService implements IColorsService {
    constructor(@InjectRepository(Color) private readonly _colorsRepository: Repository<IColor>) {}

    async findAll(): Promise<IColor[]> {
        return await this._colorsRepository.find()
    }
}