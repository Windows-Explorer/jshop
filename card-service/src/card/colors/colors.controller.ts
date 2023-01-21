import { Controller, HttpStatus, Inject } from "@nestjs/common"
import { MessagePattern } from "@nestjs/microservices"
import { OUTPUT_TOKEN, LOGGER_TOKEN, COLORS_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constant"
import { IColor } from "src/common/interfaces/color.interface"
import { IColorsService } from "src/common/interfaces/colors.service.interface"
import { ILogger } from "src/common/interfaces/logger.interface"
import { IOutput } from "src/common/interfaces/output.interface"
import { IResult } from "src/common/interfaces/result.interface"

@Controller("")
export class ColorsController {
    constructor(
        @Inject(COLORS_SERVICE_TOKEN) private readonly _colorsService: IColorsService,
        @Inject(OUTPUT_TOKEN) private readonly _output: IOutput,
        @Inject(LOGGER_TOKEN) private readonly _logger: ILogger
    ) {}

    @MessagePattern("cards.colors.findAll")
    async findAll(): Promise<IResult<IColor[]>> {
        const result: IResult<IColor[]> = await this._output.responseAsync(HttpStatus.OK, await this._colorsService.findAll())
        this._logger.log(result, "cards.colors.findAll")
        return result
    }
}