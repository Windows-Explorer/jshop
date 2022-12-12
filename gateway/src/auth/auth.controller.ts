import { Body, Controller, Get, Headers, Inject, Injectable, Post, Req, Res } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { Request, Response } from 'express'
import { IResult } from 'src/dto/result.dto'

@Injectable()
@Controller('auth')
export class AuthController {
    constructor(@Inject("AUTH_GATEWAY") private readonly client: ClientKafka) {}

    @Post("/signup")
    async signUp(@Body() message: any, @Res() response: Response): Promise<any> {
        console.log(message)
        const result: IResult<any> = await this.client.send("post.auth.signUp", message).toPromise()
        response.status(result.error.statusCode).send(result.data)
    }

    @Post("/signin")
    async signIn(@Body() message: any, @Res() response: Response): Promise<void> {
        const result: IResult<any> = await this.client.send("post.auth.signIn", message).toPromise()
        response.status(result.error.statusCode).send(result.data)
    }

    @Get("/verify")
    async verifyToken(@Req() request: Request, @Res() response: Response): Promise<void> {
        let token: string = ""
        try {
            token = request.headers.authorization.replace("Bearer ", "")
        }
        catch {
            token = ""
        }
        const result: IResult<any> = await this.client.send("get.auth.verify", token).toPromise()
        response.status(result.error.statusCode).send(result.data)
    }
    
}
