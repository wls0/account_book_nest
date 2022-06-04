import { ConflictException, Injectable } from '@nestjs/common'
import { UserRepository } from './users.repository'
import { CreateSalt, Password } from '../common/lib/lib'
import { UserCheckResDTO, CreateUserResDTO } from './dto/users.dto'
@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  async CheckUserId(params: UserCheckResDTO) {
    const { id } = params
    const check = await this.userRepository.IdFind(id)
    if (!check) {
      return ''
    } else {
      throw new ConflictException()
    }
  }

  async CreateUser(body: CreateUserResDTO) {
    const { id, pwd } = body
    const userCheck = await this.userRepository.IdFind(id)
    if (!userCheck) {
      const salt = CreateSalt()
      const password = Password({ pwd, salt })
      const result = await this.userRepository.UserCreate({
        id,
        password,
        salt,
      })
      if (result) {
        return ''
      }
    } else {
      throw new ConflictException()
    }
  }
}
