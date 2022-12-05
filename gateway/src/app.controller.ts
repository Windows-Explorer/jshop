import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from './guards/auth.guard'

@Controller('')
export class AppController {

    @UseGuards(AuthGuard)
    @Get("/")
    async index(): Promise<any> {
        return { data: "data" }
    }
}