import { Body, Controller, Inject, Injectable, Post, Res } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { Response } from 'express'
import { IResult } from 'src/dto/result.dto'

@Injectable()
@Controller('auth')
export class AuthController {
    constructor(@Inject("AUTH_GATEWAY") private readonly client: ClientKafka) {}

    @Post("/signup")
    async signUp(@Body() message: any, @Res() response: Response): Promise<any> {
        const result: IResult = await this.client.send("post.auth.signUp", message).toPromise()
        response.status(result.error.statusCode).send(result.data)
    }

    @Post("/signin")
    async signIn(@Body() message: any, @Res() response: Response): Promise<void> {
        const result: IResult = await this.client.send("post.auth.signIn", message).toPromise()
        response.status(result.error.statusCode).send(result.data)
    }
    
}
