import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class DateResDTO {
  @IsString()
  @IsNotEmpty()
  date: string
}

export class writeAccountResDTO {
  @IsString()
  @IsNotEmpty()
  bigCategory: string

  @IsString()
  smallCategory: string

  @IsString()
  @IsNotEmpty()
  card: string

  @IsNumber()
  @IsNotEmpty()
  cost: number
}
