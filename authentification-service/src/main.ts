import { ValidationPipe } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { MicroserviceOptions, Transport } from "@nestjs/microservices"
import { AppModule } from "./app.module"
import { Output } from "./common/output"
import { AllExceptionsFilter } from "./extentions/all.exception-filter"



async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [`${process.env.BROKER_HOST}:${process.env.BROKER_PORT}`],
      },
      consumer: {
        groupId: "auth-consumer",
        allowAutoTopicCreation: true
      }
    }
  })
  app.useGlobalFilters(new AllExceptionsFilter(new Output()))
  app.useGlobalPipes(new ValidationPipe())

  console.log(app.get(ConfigService))

  await app.listen()
}

bootstrap()