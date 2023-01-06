import { Inject, Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { ClientKafka, ClientsModule, Transport } from "@nestjs/microservices"
import { AuthController } from "./auth.controller"
import { UniqueController } from "./unique.controller"

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: "AUTH_GATEWAY",
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: "auth-producer",
              brokers: [`${configService.get<string>("BROKER_HOST")}:${configService.get<number>("BROKER_PORT")}`]
            },
            consumer: {
              groupId: "auth-consumer"
            }
          }
        })
      }
    ])
  ],
  controllers: [ AuthController, UniqueController ],
  exports: [ClientsModule]
})

export class AuthModule {
  constructor(@Inject("AUTH_GATEWAY") private readonly _client: ClientKafka) {}

  async onModuleInit() {
    this._client.subscribeToResponseOf("auth.verify")
    this._client.subscribeToResponseOf("auth.verify.admin")
    this._client.subscribeToResponseOf("unique.email")
    this._client.subscribeToResponseOf("unique.username")
    this._client.subscribeToResponseOf("auth.signUp")
    this._client.subscribeToResponseOf("auth.signIn")

    await this._client.connect()
  }

  async onModuleDestroy() {
    await this._client.close()
  }
}
