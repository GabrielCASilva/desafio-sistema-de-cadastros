import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCodes } from './error-codes.enum';

export class AppException extends HttpException {
  public readonly code: ErrorCodes;

  constructor(
    message: string,
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    code: ErrorCodes = ErrorCodes.ERRO_INESPERADO,
  ) {
    super(
      {
        status,
        message: `${ErrorCodes[code]} - ${message}`,
      },
      status,
    );
    this.code = code;
  }

  public getStatusCode(): number {
    return this.getStatus ? this.getStatus() : (this as any).status;
  }
}
