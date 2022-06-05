import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class LoginResDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(10)
  id: string

  @IsString()
  @IsNotEmpty()
  pwd: string
}
