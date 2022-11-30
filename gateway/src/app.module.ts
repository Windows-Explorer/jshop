import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ConfigModule } from "@nestjs/config"
import { UniqueController } from './unique/unique.controller';
import { UniqueModule } from './unique/unique.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
      isGlobal: true
    }),
    // UniqueModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: []
})

export class AppModule {}
