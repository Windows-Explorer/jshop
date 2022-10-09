import { Module } from '@nestjs/common'
import { UsersModule } from 'src/users/users.module'
import { UsersService } from 'src/users/users.service'
import { AuthService } from './auth.service'
import { JwtModule } from "@nestjs/jwt"

@Module({
  imports: [
    UsersModule,
    JwtModule
  ],
  providers: [AuthService]
})
export class AuthModule {}
