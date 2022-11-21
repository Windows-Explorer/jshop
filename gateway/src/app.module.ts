import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ConfigModule } from "@nestjs/config"

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
      isGlobal: true
    })
  ],
  controllers: [AppController]
})

export class AppModule {}
