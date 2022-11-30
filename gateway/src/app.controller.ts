import { Controller, Get, Post, Body, HttpCode, Res, HttpStatus } from '@nestjs/common'
import { Client, ClientKafka, Transport } from '@nestjs/microservices'
import { response, Response } from 'express'
import { IResult } from './dto/result.dto'

@Controller('auth')
export class AppController {

    @Client({
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: "gateway-producer",
                brokers: [`${"192.168.43.74"}:${9092}`],
            },
            consumer: {
                groupId: "auth-consumer"
            },
        }
    })

    client: ClientKafka

    async onModuleInit() {
        this.client.subscribeToResponseOf("post.auth.signUp")
        this.client.subscribeToResponseOf("post.auth.signIn")

        await this.client.connect()
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