import { Controller, Get, Post, Body, HttpCode, Res, HttpStatus, UseGuards } from '@nestjs/common'
import { Client, ClientKafka, Transport } from '@nestjs/microservices'
import { response, Response } from 'express'
import { AuthGuard } from './auth/guards/auth.guard'
import { IResult } from './dto/result.dto'

@Controller('')
export class AppController {

    @UseGuards(AuthGuard)
    @Get("/")
    async index(): Promise<string> {
        return "string"
    }
}