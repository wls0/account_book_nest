import { Injectable } from '@nestjs/common'
import { Users } from 'src/model/users.model'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async IdFind(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } })
    if (user) {
      return true
    } else {
      return false
    }
  }

  async UserCreate(data: { id: string; password: string; salt: string }) {
    try {
      const { id, password, salt } = data
      await this.usersRepository.save({
        id,
        password,
        salt,
      })
      return true
    } catch (E) {
      return false
    }
  }
}
