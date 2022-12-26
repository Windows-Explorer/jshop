import { Controller, Get, Inject, Injectable, Param, Res } from "@nestjs/common"
import { ClientKafka } from "@nestjs/microservices"
import { Response } from "express"
import { IResult } from "src/dto/result.dto"

@Injectable()
@Controller("unique")
export class UniqueController {
    constructor(@Inject("AUTH_GATEWAY") private readonly client: ClientKafka) {}

    @Get("/email/:email")
    async getUniqueEmail(@Param("email") email: string, @Res() response: Response): Promise<any> {
        const result: IResult<any> = await this.client.send("get.unique.email", email).toPromise()
        response.status(result.statusCode).send(result.message)
    }

    @Get("/username/:username")
    async getUniqueUsername(@Param("username") username: string, @Res() response: Response) {
        const result: IResult<any> = await this.client.send("get.unique.username", username).toPromise()
        response.status(result.statusCode).send(result.message)
    }
}
