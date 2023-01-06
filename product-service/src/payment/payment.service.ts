import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PaymentService {

    constructor(private readonly httpService: HttpService) {}

    private test: any = {
        "TerminalKey": "TinkoffBankTest",
        "Amount": 140000,
        "OrderId": "21050",
        "Description": "Подарочная карта на 1400.00 рублей",
        "DATA": {
            "Phone": "+71234567890",
            "Email": "a@test.com"
        },
        "Receipt": {
            "Email": "a@test.ru",
            "Phone": "+79031234567",
            "EmailCompany": "b@test.ru",
            "Taxation": "osn",
            "Items": [
                {
                    "Name": "Наименование товара 1",
                    "Price": 10000,
                    "Quantity": 1.00,
                    "Amount": 10000,
                    "PaymentMethod": "full_prepayment",
                    "PaymentObject": "commodity",
                    "Tax": "vat10",
                    "Ean13": "0123456789"
                },
                {
                    "Name": "Наименование товара 2",
                    "Price": 20000,
                    "Quantity": 2.00,
                    "Amount": 40000,
                    "PaymentMethod": "prepayment",
                    "PaymentObject": "service",
                    "Tax": "vat20"
                },
                {
                    "Name": "Наименование товара 3",
                    "Price": 30000,
                    "Quantity": 3.00,
                    "Amount": 90000,
                    "Tax": "vat10"
                }
            ]
        }
    }

    async init(): Promise<any> {
        
        const result = await this.httpService.post("https://rest-api-test.tinkoff.ru/v2/Init/", this.test, ).toPromise()
        return result
    }
}
