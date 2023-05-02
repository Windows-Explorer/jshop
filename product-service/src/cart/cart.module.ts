import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CART_SERVICE_TOKEN, RESULTER_TOKEN } from "src/common/constants/inject-tokens.constant"
import { CartService } from "./cart.service"
import { CartController } from "./cart.conrtoller"
import { Resulter } from "src/common/resulter"
import { ClientsModule, Transport } from "@nestjs/microservices"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { RedisModule } from "@liaoliaots/nestjs-redis"

@Module({
    imports: [
        RedisModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                config: {
                    host: configService.get<string>("REDIS_HOST"),
                    port: configService.get<number>("REDIS_PORT"),
                    password: configService.get<string>("REDIS_PASSWORD")
                }
            })
        })
    ],
    providers: [
        { provide: CART_SERVICE_TOKEN, useClass: CartService },
        { provide: RESULTER_TOKEN, useClass: Resulter },
    ],
    controllers: [
        CartController
    ]
})
export class CartModule {

}