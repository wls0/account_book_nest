import { Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Password } from 'src/common/lib/lib'
import { LoginResDTO } from './dto/login.dto'
import { LoginRepository } from './login.repository'

@Injectable()
export class LoginService {
  constructor(
    private readonly loginRepository: LoginRepository,
    private readonly jwtService: JwtService,
  ) {}
  async login(body: LoginResDTO) {
    const { id, pwd } = body
    const user = await this.loginRepository.login(id)
    if (user) {
      const userPwd = user.password
      const checkPwd = Password({ pwd, salt: user.salt })
      if (userPwd === checkPwd) {
        const token = this.jwtService.sign({ index: user.index })
        return token
      } else {
        throw new NotFoundException()
      }
    } else {
      throw new NotFoundException()
    }
  }
}
