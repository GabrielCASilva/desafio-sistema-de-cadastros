import { AppException } from './app.exception';
import { HttpStatus } from '@nestjs/common';
import { ErrorCodes } from './error-codes.enum';

export class AppGenericException extends AppException {
  constructor(
    message = 'Um erro inesperado aconteceu',
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(message, status, ErrorCodes.ERRO_INESPERADO);
  }
}
