import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async login(user: User) {
        const payload = { username: user.username, email: user.email }
        return {
            access_token: this.jwtService.sign(payload),
        }
      }
}
