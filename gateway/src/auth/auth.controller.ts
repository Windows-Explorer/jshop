import { Body, Controller, Get, Inject, Injectable, Param, Post, Res } from '@nestjs/common'
import { Client, ClientKafka, Transport } from '@nestjs/microservices'
import { Response } from 'express'
import { IResult } from 'src/dto/result.dto'

@Injectable()
@Controller('auth')
export class AuthController {
    constructor(@Inject("AUTH_GATEWAY") private readonly client: ClientKafka) {}

    async onModuleInit() {
        this.client.subscribeToResponseOf("post.auth.signUp")
        this.client.subscribeToResponseOf("post.auth.signIn")

        await this.client.connect()
        console.log("Auth module inited")
    }

    async onModuleDestroy() {
        await this.client.close()
    }

    @Post("/signup")
    async signUp(@Body() message: any, @Res() response: Response): Promise<any> {
        const result: IResult = await this.client.send("post.auth.signUp", message).toPromise()
        console.log(result)
        response.status(result.error.statusCode).send(result.data)

    }

    @Post("/signin")
    async signIn(@Body() message: any, @Res() response: Response): Promise<void> {
        console.log(message)

        const result: IResult = await this.client.send("post.auth.signIn", message).toPromise()
        console.log(`result: ${result}`)
        response.status(result.error.statusCode).send(result.data)
    }
    
}
