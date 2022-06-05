import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/common/decorators/user.decorator'

import { JwtAuthGuard } from 'src/login/passport/jwt.guard'
import { Payload } from 'src/login/passport/jwt.payload'
import { AccountsService } from './accounts.service'
import { DateResDTO, WriteAccountResDTO } from './dto/accounts.dto'

@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post(':date')
  async createAccount(
    @CurrentUser() user: Payload,
    @Param() param: DateResDTO,
    @Body() body: WriteAccountResDTO,
  ) {
    return await this.accountsService.writeAccount(user, param, body)
  }
}
