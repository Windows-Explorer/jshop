import { Inject, Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { ClientKafka, ClientsModule, Transport } from "@nestjs/microservices"
import { AuthModule } from "src/auth/auth.module"
import { CART_KAFKA_CLIENT_TOKEN } from "src/common/constants/inject-tokens.constants"
import { CartController } from "./cart.controller"

@Module({
    imports: [
        AuthModule,
        ClientsModule.registerAsync([
            {
                name: CART_KAFKA_CLIENT_TOKEN,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: async (configService: ConfigService) => ({
                    transport: Transport.KAFKA,
                    options: {
                        client: {
                            clientId: "cart-producer",
                            brokers: [`${configService.get<string>("BROKER_HOST")}:${configService.get<number>("BROKER_PORT")}`]
                        },
                        consumer: {
                            groupId: "cart-consumer"
                        }
                    }
                })
            }
        ])
    ],
    controllers: [CartController]
})
export class CartModule {
    constructor(@Inject(CART_KAFKA_CLIENT_TOKEN) private readonly _client: ClientKafka) { }

    async onModuleInit() {
        this._client.subscribeToResponseOf("cart.getCart")
        this._client.subscribeToResponseOf("cart.addProductToCart")
        this._client.subscribeToResponseOf("cart.removeProductFromCart")
        this._client.subscribeToResponseOf("cart.clearCart")

        await this._client.connect()
    }

    async onModuleDestroy() {
        await this._client.close()
    }
}
