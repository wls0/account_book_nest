import { Injectable, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/login/passport/jwt.guard'
import { Payload } from 'src/login/passport/jwt.payload'
import { AccountsRepository } from './accounts.repository'
import {
  DateResDTO,
  AccountsListDTO,
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
    const shinhan = await this.accountsRepository.ShinhanCost(user, param)
    const samsung = await this.accountsRepository.SamsungCost(user, param)
    const hyundai = await this.accountsRepository.HyundaiCost(user, param)
    const woori = await this.accountsRepository.WooriCost(user, param)
    const lotte = await this.accountsRepository.LotteCost(user, param)
    const kb = await this.accountsRepository.KbCost(user, param)
    const revenue = await this.accountsRepository.RevenueCost(user, param)
    const result =
      cash + shinhan + samsung + hyundai + woori + lotte + kb - revenue
    return result
  }

  async findAccountList(user: Payload, param: AccountsListDTO) {
    const list = await this.accountsRepository.UseCardList(user, param)
    return list
  }
}
