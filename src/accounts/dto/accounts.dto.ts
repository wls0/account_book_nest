import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator'

export class DateResDTO {
  @IsString()
  @IsNotEmpty()
  date: string
}
export class DayResDTO {
  @IsString()
  @IsNotEmpty()
  @Length(10)
  @Matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)
  date: string
}
export class MonthResDTO {
  @IsString()
  @IsNotEmpty()
  @Length(7)
  @Matches(/^\d{4}-(0[1-9]|1[012])$/)
  date: string
}
export class YearResDTO {
  @IsString()
  @IsNotEmpty()
  @Length(4)
  @Matches(/^\d{4}$/)
  date: string
}
export class WriteAccountResDTO {
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

export class AccountsListDTO extends DayResDTO {
  @IsString()
  @IsNotEmpty()
  @Matches(/^(cash|shinhan|samsung|hyundai|woori|lotte|kb)$/)
  card: string
}
