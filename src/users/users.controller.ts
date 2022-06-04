import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateUserResDTO, UserCheckResDTO } from './dto/users.dto'
import { UsersService } from './users.service'
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async checkUserId(@Param() param: UserCheckResDTO) {
    return await this.usersService.CheckUserId(param)
  }

  @Post('signup')
  async createUser(@Body() body: CreateUserResDTO) {
    return await this.usersService.CreateUser(body)
  }
}
