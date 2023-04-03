import { Controller, Get, Inject, Injectable, Param } from "@nestjs/common"
import { ICheckUniqueService } from "src/common/interfaces/services/check-unique.service.interface"

@Injectable()
@Controller("unique")
export class UniqueController {
    constructor(
        @Inject() private readonly _checkUniqueService: ICheckUniqueService
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
