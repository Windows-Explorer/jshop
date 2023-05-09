import { Controller, HttpStatus, Inject } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"
import { OUTPUT_TOKEN, UNIQUE_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constant"
import { IResult } from "src/common/interfaces/result.interface"
import { IOutput } from "src/common/interfaces/resulter.interface"
import { IUniqueService } from "src/common/interfaces/services/unique.service.interface"

@Controller("")
export class UniqueController {
    constructor(
        @Inject(UNIQUE_SERVICE_TOKEN) private readonly _uniqueService: IUniqueService,
        @Inject(OUTPUT_TOKEN) private readonly _output: IOutput
    ) { }

    @MessagePattern("unique.email")
    async isEmailUnique(@Payload() email: string): Promise<IResult<boolean>> {
        try {
            return await this._output.responseAsync(HttpStatus.OK, await this._uniqueService.isEmailUnique(email))
        }
        catch {
            return await this._output.responseAsync(HttpStatus.OK, false)
        }
    }


    @MessagePattern("unique.username")
    async isUsernameUnique(@Payload() username: string): Promise<IResult<boolean>> {
        try {
            return await this._output.responseAsync(HttpStatus.OK, await this._uniqueService.isUsernameUnique(username))
        }
        catch {
            return await this._output.responseAsync(HttpStatus.OK, false)
        }
    }
}
