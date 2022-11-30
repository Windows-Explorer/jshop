import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { AppModule } from 'src/app.module'
import { AuthController } from './auth.controller'
import { UniqueController } from './unique.controller'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "AUTH_GATEWAY",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "auth-producer",
            brokers: ['192.168.43.74:9092']
          },
          consumer: {
            groupId: "auth-consumer"
          }
        }
      }
    ])
  ],
  controllers: [ AuthController, UniqueController ]
})
export class AuthModule {}
