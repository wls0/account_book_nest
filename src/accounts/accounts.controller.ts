import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { CurrentUser } from 'src/common/decorators/user.decorator'

import { JwtAuthGuard } from 'src/login/passport/jwt.guard'
import { Payload } from 'src/login/passport/jwt.payload'
import { AccountsService } from './accounts.service'
import {
  UpdateAccountResDTO,
  FindAccountsListResDTO,
  DayResDTO,
  MonthResDTO,
  WriteAccountResDTO,
  YearResDTO,
  AccountIndexResDTO,
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
    @Param() param: FindAccountsListResDTO,
  ) {
    return await this.accountsService.findAccountList(user, param)
  }

  @Patch(':index')
  async updateAccount(
    @CurrentUser() user: Payload,
    @Param() param: AccountIndexResDTO,
    @Body() body: UpdateAccountResDTO,
  ) {
    return await this.accountsService.updateAccount(user, param, body)
  }

  @Delete(':index')
  async deleteAccount(
    @CurrentUser() user: Payload,
    @Param() param: AccountIndexResDTO,
  ) {
    return await this.accountsService.deleteAccount(user, param)
  }
}
