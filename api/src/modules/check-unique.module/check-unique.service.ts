import { Inject, Injectable } from "@nestjs/common"
import { CHECK_UNIQUE_SERVICE_TOKEN, USERS_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constants"
import { ICheckUniqueService } from "src/common/interfaces/services/check-unique.service.interface"
import { IUsersService } from "src/common/interfaces/services/user.service.interface"

@Injectable()
export class CheckUniqueService implements ICheckUniqueService {
    constructor(
        @Inject(USERS_SERVICE_TOKEN) private readonly _usersService: IUsersService
    ) { }

    async checkEmailUnique(email: string): Promise<boolean> {
        try {
            if (this._usersService.findByEmail(email)) {
                return false
            }
            else {
                return true
            }
        } catch (error) {
            throw false
        }
    }
    async checkUsernameUnique(username: string): Promise<boolean> {
        try {
            if (this._usersService.findByEmail(username)) {
                return false
            }
            else {
                return true
            }
        } catch (error) {
            throw false
        }
    }
}