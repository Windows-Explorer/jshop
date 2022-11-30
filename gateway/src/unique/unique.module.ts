import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppModule } from 'src/app.module';
import { UniqueController } from './unique.controller';

@Module({
    controllers: [ UniqueController ]
})
export class UniqueModule {}
