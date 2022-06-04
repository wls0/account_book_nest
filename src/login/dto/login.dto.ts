import { IsNotEmpty, IsString } from 'class-validator'

export class LoginResDTO {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsString()
  @IsNotEmpty()
  pwd: string
}
