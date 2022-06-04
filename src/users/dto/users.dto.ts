import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class UserCheckResDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(10)
  id: string
}

export class CreateUserResDTO extends UserCheckResDTO {
  @IsString()
  @IsNotEmpty()
  pwd: string
}
