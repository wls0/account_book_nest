import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common'
import { Response } from 'express'
// Request,
@Catch(HttpException)
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    // const request = ctx.getRequest<Request>();
    const status = exception.getStatus()
    const error = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string | string[] }

    if (typeof error === 'string') {
      response.status(status).json({
        result: false,
        statusCode: status,

        // timestamp: new Date().toISOString(),
        // path: request.url,
        error,
      })
    } else {
      response.status(status).json({
        result: false,
        statusCode: status,

        // timestamp: new Date().toISOString(),
        // path: request.url,
        ...error,
      })
    }
  }
}
