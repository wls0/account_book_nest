import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ErrorExceptionFilter } from './common/filters/error.exception'
import { SuccessInterceptor } from './common/interceptors/success.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalFilters(new ErrorExceptionFilter())
  app.useGlobalInterceptors(new SuccessInterceptor())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
}

bootstrap()
