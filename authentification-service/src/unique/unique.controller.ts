import { Controller, HttpStatus } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"
import { IResult } from "src/dto/result.dto"
import { UsersService } from "src/users/users.service"

@Controller("")
export class UniqueController {
    constructor(private readonly userService: UsersService) {}

    @MessagePattern("get.unique.email")
    async isEmailUnique(@Payload() uniqueDto: string): Promise<IResult<string | null>> {
        try {
            return { statusCode: HttpStatus.OK, message: (await this.userService.findByEmail(uniqueDto)).email }
        }
        catch {
            return { statusCode: HttpStatus.OK, message: null }
        }
    }

    
    @MessagePattern("get.unique.username")
    async isUsernameUnique(@Payload() uniqueDto: string): Promise<IResult<string | null>> {
        try {
            return { statusCode: HttpStatus.OK, message: (await this.userService.findByUsername(uniqueDto)).username }
        }
        catch {
            return { statusCode: HttpStatus.OK, message: null }
        }
    }
}
