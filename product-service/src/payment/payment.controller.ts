import { Controller, Get } from '@nestjs/common'
import { PaymentService } from './payment.service'

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Get("/")
    async test() {
        return this.paymentService.init()
    }
}
