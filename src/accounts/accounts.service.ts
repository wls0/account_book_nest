import { Injectable, NotFoundException, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/login/passport/jwt.guard'
import { Payload } from 'src/login/passport/jwt.payload'
import { AccountsRepository } from './accounts.repository'
import {
  AccountIndexResDTO,
  DateResDTO,
  FindAccountsListResDTO,
  UpdateAccountResDTO,
  WriteAccountResDTO,
} from './dto/accounts.dto'

@UseGuards(JwtAuthGuard)
@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}
  async writeAccount(
    user: Payload,
    param: DateResDTO,
    body: WriteAccountResDTO,
  ) {
    await this.accountsRepository.writeAccount(user, param, body)
    return ''
  }

  async findAccount(user: Payload, param: DateResDTO) {
    const cash = await this.accountsRepository.cashCost(user, param)
    const shinhan = await this.accountsRepository.shinhanCost(user, param)
    const samsung = await this.accountsRepository.samsungCost(user, param)
    const hyundai = await this.accountsRepository.hyundaiCost(user, param)
    const woori = await this.accountsRepository.wooriCost(user, param)
    const lotte = await this.accountsRepository.lotteCost(user, param)
    const kb = await this.accountsRepository.KbCost(user, param)
    const revenue = await this.accountsRepository.revenueCost(user, param)
    const result =
      cash + shinhan + samsung + hyundai + woori + lotte + kb - revenue
    return result
  }

  async findAccountList(user: Payload, param: FindAccountsListResDTO) {
    const list = await this.accountsRepository.useCardList(user, param)
    return list
  }

  async updateAccount(
    user: Payload,
    param: AccountIndexResDTO,
    body: UpdateAccountResDTO,
  ) {
    const userIndex = user.index
    const index = Number(param.index)
    const check = await this.accountsRepository.selectAccount(userIndex, index)
    if (check) {
      await this.accountsRepository.updateAccount(param, body)
      return ''
    } else {
      throw new NotFoundException()
    }
  }

  async deleteAccount(user: Payload, param: AccountIndexResDTO) {
    const userIndex = user.index
    const index = Number(param.index)
    const check = await this.accountsRepository.selectAccount(userIndex, index)
    if (check) {
      await this.accountsRepository.deleteAccount(param)
      return ''
    } else {
      throw new NotFoundException()
    }
  }
}
