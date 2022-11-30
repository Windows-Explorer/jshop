import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ConfigModule } from "@nestjs/config"
import { AuthModule } from './auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
      isGlobal: true
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: []
})

export class AppModule {}
