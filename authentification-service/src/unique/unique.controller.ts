import { Controller, HttpStatus } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { IResult } from 'src/dto/result.dto'
import { UniqueDto } from 'src/dto/unique.dto'
import { UsersService } from 'src/users/users.service'

@Controller('')
export class UniqueController {
    constructor(private readonly userService: UsersService) {}

    @MessagePattern("get.unique.email")
    async isEmailUnique(@Payload() uniqueDto: string): Promise<IResult> {
        try {
            return { data: (await this.userService.findByEmail(uniqueDto)).email, error: { message: "OK", statusCode: HttpStatus.OK } }
        }
        catch {
            return { data: null, error: { message: "OK", statusCode: HttpStatus.OK } }
        }
    }

    
    @MessagePattern("get.unique.username")
    async isUsernameUnique(@Payload() uniqueDto: string): Promise<IResult> {
        try {
            return { data: (await this.userService.findByUsername(uniqueDto)).username, error: { message: "OK", statusCode: HttpStatus.OK }  }
        }
        catch {
            return { data: null, error: { message: "OK", statusCode: HttpStatus.OK } }
        }
    }
}