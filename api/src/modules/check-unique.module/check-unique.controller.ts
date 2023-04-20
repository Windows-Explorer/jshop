import { Controller, Get, Inject, Injectable, Param } from "@nestjs/common"
import { ICheckUniqueService } from "src/common/interfaces/services/check-unique.service.interface"
import { CHECK_UNIQUE_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constants"

@Injectable()
@Controller("unique")
export class UniqueController {
    constructor(
        @Inject(CHECK_UNIQUE_SERVICE_TOKEN) private readonly _checkUniqueService: ICheckUniqueService
    ) { }

    @Get("/email/:email")
    async checkUniqueEmail(@Param("email") email: string): Promise<boolean> {
        return await this._checkUniqueService.checkEmailUnique(email)
    }

    @Get("/username/:username")
    async checkUniqueUsername(@Param("username") username: string): Promise<boolean> {
        return await this._checkUniqueService.checkUsernameUnique(username)
    }
}
