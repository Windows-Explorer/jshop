import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './extentions/all.exception-filter';



async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.KAFKA,
      options: {
          client: {
              brokers: ['192.168.43.74:9092'],
          },
          consumer: {
              groupId: 'auth-consumer',
          }
      }
  })
  app.useGlobalFilters(new AllExceptionsFilter())
//   app.useGlobalPipes(new ValidationPipe());
  await app.listen()
}

bootstrap()