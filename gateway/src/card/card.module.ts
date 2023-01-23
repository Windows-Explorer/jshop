import { Inject, Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { ClientKafka, ClientsModule, Transport } from "@nestjs/microservices"
import { AuthModule } from "src/auth/auth.module"
import { CARD_KAFKA_CLIENT_TOKEN } from "src/common/constants/inject-tokens.constants"
import { CardController } from "./card.controller"
import { CardProtectedController } from "./card.protected.controller"

@Module({
    imports: [
        AuthModule,
        ClientsModule.registerAsync([
            {
                name: CARD_KAFKA_CLIENT_TOKEN,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: async (configService: ConfigService) => ({
                    transport: Transport.KAFKA,
                    options: {
                        client: {
                            clientId: "card-producer",
                            brokers: [`${configService.get<string>("BROKER_HOST")}:${configService.get<number>("BROKER_PORT")}`]
                        },
                        consumer: {
                            groupId: "card-consumer"
                        }
                    }
                })
            }
        ])
    ],
    controllers: [CardController, CardProtectedController]
})
export class CardModule {
    constructor(@Inject(CARD_KAFKA_CLIENT_TOKEN) private readonly _client: ClientKafka) {}

    async onModuleInit() {
        this._client.subscribeToResponseOf("cards.findAll")
        this._client.subscribeToResponseOf("cards.parse")
        this._client.subscribeToResponseOf("cards.save")
        this._client.subscribeToResponseOf("cards.colors.findAll")
        this._client.subscribeToResponseOf("cards.types.findAll")
        

        await this._client.connect()
    }

    async onModuleDestroy() {
        await this._client.close()
    }
}