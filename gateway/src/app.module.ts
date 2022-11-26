import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ConfigModule } from "@nestjs/config"
import { AuthService } from './auth/auth.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [AuthService]
})

export class AppModule {}
