import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/common/decorators/user.decorator'

import { JwtAuthGuard } from 'src/login/passport/jwt.guard'
import { Payload } from 'src/login/passport/jwt.payload'
import { AccountsService } from './accounts.service'
import {
  AccountsListDTO,
  DayResDTO,
  MonthResDTO,
  WriteAccountResDTO,
  YearResDTO,
} from './dto/accounts.dto'

@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post(':date')
  async createAccount(
    @CurrentUser() user: Payload,
    @Param() param: DayResDTO,
    @Body() body: WriteAccountResDTO,
  ) {
    return await this.accountsService.writeAccount(user, param, body)
  }

  @Get('day/:date')
  async dayAccountFind(
    @CurrentUser() user: Payload,
    @Param() param: DayResDTO,
  ) {
    return await this.accountsService.findAccount(user, param)
  }

  @Get('month/:date')
  async monthAccountFind(
    @CurrentUser() user: Payload,
    @Param() param: MonthResDTO,
  ) {
    return await this.accountsService.findAccount(user, param)
  }

  @Get('year/:date')
  async yearAccountFind(
    @CurrentUser() user: Payload,
    @Param() param: YearResDTO,
  ) {
    return await this.accountsService.findAccount(user, param)
  }

  @Get('/card/:card/day/:date')
  async detailAccountListFind(
    @CurrentUser() user: Payload,
    @Param() param: AccountsListDTO,
  ) {
    return await this.accountsService.findAccountList(user, param)
  }
}
