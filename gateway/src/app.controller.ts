import { Controller, Get, Post, Body, HttpCode, Res, HttpStatus } from '@nestjs/common'
import { Client, ClientKafka, Transport } from '@nestjs/microservices'
import { Response } from 'express'
import { IResult } from './extentions/result.interface'

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
    async signUp(@Body() message: any, @Res() response: Response) {
        const result: IResult = await this.client.send("post.auth.signUp", message).toPromise()
        
        console.log(result)

        response.status(result.error.code).send(result)
    }

    @Post("/signin")
    async signIn(@Body() message: any): Promise<any> {
        return this.client.send("post.auth.signIn", message)
    }
    
}