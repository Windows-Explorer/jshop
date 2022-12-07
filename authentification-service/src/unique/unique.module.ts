import { Module } from '@nestjs/common'
import { UsersModule } from 'src/users/users.module'
import { UniqueController } from './unique.controller'

@Module({
    controllers: [ UniqueController],
    imports: [UsersModule]
})
export class UniqueModule {}
