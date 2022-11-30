import { Controller, Get, Post, Body, HttpCode, Res, HttpStatus } from '@nestjs/common'
import { Client, ClientKafka, Transport } from '@nestjs/microservices'
import { response, Response } from 'express'
import { IResult } from './dto/result.dto'

@Controller('')
export class AppController {
    
}