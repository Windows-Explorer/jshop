import { Controller, Get, Inject, Injectable, Param, Res } from '@nestjs/common'
import { Client, ClientKafka, Transport } from '@nestjs/microservices'
import { Response } from 'express'
import { IResult } from 'src/dto/result.dto'

@Injectable()
@Controller('unique')
export class UniqueController {
    constructor(@Inject("GATEWAY") private readonly client: ClientKafka) {}
    


    async onModuleInit() {
        this.client.subscribeToResponseOf("get.unique.email")
        this.client.subscribeToResponseOf("get.unique.username")

        await this.client.connect()
        console.log("Unique inited")
    }

    async onModuleDestroy() {
        await this.client.close()
    }

    @Get("/email/:email")
    async signUp(@Param("email") email: string, @Res() response: Response): Promise<any> {
        const result: IResult = await this.client.send("get.unique.email", email).toPromise()
        response.status(result.error.statusCode).send(result.data)
    }

    @Get("/username/:username")
    async getUniqueUsername(@Param("username") username: string, @Res() response: Response) {
        const result: IResult = await this.client.send("get.unique.username", username).toPromise()
        response.status(result.error.statusCode).send(result.data)
    }
}
