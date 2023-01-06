import { Body, Controller, Get, Inject, Injectable, Post, Req, Res } from "@nestjs/common"
import { ClientKafka } from "@nestjs/microservices"
import { Request, Response } from "express"
import { IResult } from "src/dto/result.dto"

@Controller("auth")
export class AuthController {
    constructor(@Inject("AUTH_GATEWAY") private readonly _client: ClientKafka) {}

    @Post("/signup")
    async signUp(@Body() message: any, @Res() response: Response): Promise<void> {
        const result: IResult<any> = await this._client.send("auth.signUp", message).toPromise()
        response.status(result.statusCode).send(result.message)
    }

    @Post("/signin")
    async signIn(@Body() message: any, @Res() response: Response): Promise<void> {
        const result: IResult<any> = await this._client.send("auth.signIn", message).toPromise()
        response.status(result.statusCode).send(result.message)
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
        const result: IResult<any> = await this._client.send("auth.verify", token).toPromise()
        response.status(result.statusCode).send(result.message)
    }
    
}
