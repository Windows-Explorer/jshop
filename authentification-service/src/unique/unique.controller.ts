import { Controller, HttpStatus, Inject } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"
import { IUsersService } from "src/common/interfaces/user.service.interface"
import { RESULTER_TOKEN, USERS_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constant"
import { IResult } from "src/common/interfaces/result.interface"
import { IResulter } from "src/common/interfaces/resulter.interface"

@Controller("")
export class UniqueController {
    constructor(
        @Inject(USERS_SERVICE_TOKEN) private readonly _userService: IUsersService,
        @Inject(RESULTER_TOKEN) private readonly _resulter: IResulter
    ) {}

    @MessagePattern("unique.email")
    async isEmailUnique(@Payload() uniqueDto: string): Promise<IResult<string>> {
        try {
            return await this._resulter.responseAsync(HttpStatus.OK, (await this._userService.findByEmail(uniqueDto)).email)
        }
        catch {
            return await this._resulter.responseAsync(HttpStatus.OK, "")
        }
    }

    
    @MessagePattern("unique.username")
    async isUsernameUnique(@Payload() uniqueDto: string): Promise<IResult<string>> {
        try {
            return await this._resulter.responseAsync(HttpStatus.OK, (await this._userService.findByUsername(uniqueDto)).username)
        }
        catch {
            return await this._resulter.responseAsync(HttpStatus.OK, "")
        }
    }
}
