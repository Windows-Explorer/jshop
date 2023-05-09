import { Inject } from "@nestjs/common";
import { USERS_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constant";
import { IUniqueService } from "src/common/interfaces/services/unique.service.interface"
import { IUsersService } from "src/common/interfaces/services/user.service.interface"
import { IUser } from "src/common/interfaces/user.interface"

export class UniqueService implements IUniqueService {
    constructor(
        @Inject(USERS_SERVICE_TOKEN) private readonly _userService: IUsersService
    ) { }

    async isEmailUnique(email: string): Promise<boolean> {
        try {
            const result: IUser = await this._userService.findByEmail(email)
            if (result.email == email) {
                return true
            }
            else {
                return false
            }
        }
        catch (error) {
            return false
        }
    }

    async isUsernameUnique(username: string): Promise<boolean> {
        try {
            const result: IUser = await this._userService.findByUsername(username)
            if (result.username == username) {
                return true
            }
            else {
                return false
            }
        }
        catch (error) {
            return false
        }
    }
}