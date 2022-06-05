import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Payload } from 'src/login/passport/jwt.payload'
import { Accounts } from 'src/model/accounts.model'
import { Repository } from 'typeorm'
import {
  AccountsListDTO,
  DateResDTO,
  WriteAccountResDTO,
} from './dto/accounts.dto'

@Injectable()
export class AccountsRepository {
  constructor(
    @InjectRepository(Accounts)
    private readonly accountModel: Repository<Accounts>,
  ) {}
  async writeAccount(
    user: Payload,
    param: DateResDTO,
    body: WriteAccountResDTO,
  ) {
    try {
      const { index } = user
      const { date } = param
      const { bigCategory, smallCategory, card, cost } = body
      await this.accountModel.save({
        user: index,
        date,
        bigCategory,
        smallCategory,
        card,
        cost,
      })
    } catch (E) {
      throw new InternalServerErrorException()
    }
  }

  async cashCost(user: Payload, param: DateResDTO) {
    const { index } = user
    const { date } = param
    const { cost } = await this.accountModel
      .createQueryBuilder('accounts')
      .where('accounts.user = :user', { user: index })
      .andWhere('accounts.date like :date', { date: `${date}%` })
      .andWhere('accounts.card = :card', { card: 'cash' })
      .addSelect('SUM(accounts.cost)', 'cost')
      .getRawOne()
    if (cost) {
      return Number(cost)
    } else {
      return 0
    }
  }

  async ShinhanCost(user: Payload, param: DateResDTO) {
    const { index } = user
    const { date } = param
    const { cost } = await this.accountModel
      .createQueryBuilder('accounts')
      .where('accounts.user = :user', { user: index })
      .andWhere('accounts.date like :date', { date: `${date}%` })
      .andWhere('accounts.card = :card', { card: 'shinhan' })
      .addSelect('SUM(accounts.cost)', 'cost')
      .getRawOne()
    if (cost) {
      return Number(cost)
    } else {
      return 0
    }
  }

  async SamsungCost(user: Payload, param: DateResDTO) {
    const { index } = user
    const { date } = param
    const { cost } = await this.accountModel
      .createQueryBuilder('accounts')
      .where('accounts.user = :user', { user: index })
      .andWhere('accounts.date like :date', { date: `${date}%` })
      .andWhere('accounts.card = :card', { card: 'samsung' })
      .addSelect('SUM(accounts.cost)', 'cost')
      .getRawOne()
    if (cost) {
      return Number(cost)
    } else {
      return 0
    }
  }

  async HyundaiCost(user: Payload, param: DateResDTO) {
    const { index } = user
    const { date } = param
    const { cost } = await this.accountModel
      .createQueryBuilder('accounts')
      .where('accounts.user = :user', { user: index })
      .andWhere('accounts.date like :date', { date: `${date}%` })
      .andWhere('accounts.card = :card', { card: 'hyundai' })
      .addSelect('SUM(accounts.cost)', 'cost')
      .getRawOne()
    if (cost) {
      return Number(cost)
    } else {
      return 0
    }
  }

  async WooriCost(user: Payload, param: DateResDTO) {
    const { index } = user
    const { date } = param
    const { cost } = await this.accountModel
      .createQueryBuilder('accounts')
      .where('accounts.user = :user', { user: index })
      .andWhere('accounts.date like :date', { date: `${date}%` })
      .andWhere('accounts.card = :card', { card: 'woori' })
      .addSelect('SUM(accounts.cost)', 'cost')
      .getRawOne()
    if (cost) {
      return Number(cost)
    } else {
      return 0
    }
  }

  async LotteCost(user: Payload, param: DateResDTO) {
    const { index } = user
    const { date } = param
    const { cost } = await this.accountModel
      .createQueryBuilder('accounts')
      .where('accounts.user = :user', { user: index })
      .andWhere('accounts.date like :date', { date: `${date}%` })
      .andWhere('accounts.card = :card', { card: 'lotte' })
      .addSelect('SUM(accounts.cost)', 'cost')
      .getRawOne()
    if (cost) {
      return Number(cost)
    } else {
      return 0
    }
  }

  async KbCost(user: Payload, param: DateResDTO) {
    const { index } = user
    const { date } = param
    const { cost } = await this.accountModel
      .createQueryBuilder('accounts')
      .where('accounts.user = :user', { user: index })
      .andWhere('accounts.date like :date', { date: `${date}%` })
      .andWhere('accounts.card = :card', { card: 'kb' })
      .addSelect('SUM(accounts.cost)', 'cost')
      .getRawOne()
    if (cost) {
      return Number(cost)
    } else {
      return 0
    }
  }

  async RevenueCost(user: Payload, param: DateResDTO) {
    const { index } = user
    const { date } = param
    const { cost } = await this.accountModel
      .createQueryBuilder('accounts')
      .where('accounts.user = :user', { user: index })
      .andWhere('accounts.date like :date', { date: `${date}%` })
      .andWhere('accounts.card = :card', { card: 'revenue' })
      .addSelect('SUM(accounts.cost)', 'cost')
      .getRawOne()
    if (cost) {
      return Number(cost)
    } else {
      return 0
    }
  }

  async UseCardList(user: Payload, param: AccountsListDTO) {
    const { index } = user
    const { date, card } = param
    const list = await this.accountModel
      .createQueryBuilder('accounts')
      .where('accounts.user = :user', { user: index })
      .andWhere('accounts.date like :date', { date })
      .andWhere('accounts.card = :card', { card })
      .addSelect('accounts.index', 'index')
      .addSelect('accounts.bigCategory', 'bigCategory')
      .addSelect('accounts.smallCategory', 'smallCategory')
      .addSelect('accounts.card', 'card')
      .addSelect('accounts.date', 'date')
      .addSelect('accounts.cost', 'cost')
      .getRawMany()
    const result = []
    for (const a of list) {
      result.push({
        index: a.index,
        bigCategory: a.bigCategory,
        smallCategory: a.smallCategory,
        card: a.card,
        cost: a.cost,
        date: a.date,
      })
    }
    return result
  }
}
