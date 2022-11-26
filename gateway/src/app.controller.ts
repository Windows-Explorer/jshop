import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common'
import { Client, ClientKafka, Transport } from '@nestjs/microservices'

@Controller('auth')
export class AppController {

    @Client({
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: "gateway-producer",
                brokers: [`192.168.43.74:9092`],
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

    @Get("/signup")
    async signUp(@Body() message: any): Promise<any> {
        return this.client.send("get.products.findAll", message)
    }

    @Post("/signin")
    async signIn(@Body() message: any): Promise<any> {
        return this.client.send("post.products.create", message)
    }
    
}