import { Body, Controller, Post } from '@nestjs/common'
import { LoginResDTO } from './dto/login.dto'
import { LoginService } from './login.service'

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() body: LoginResDTO) {
    return await this.loginService.login(body)
  }
}
