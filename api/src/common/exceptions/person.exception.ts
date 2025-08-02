import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';
import { ErrorCodes } from './error-codes.enum';

export class CreatePersonException extends AppException {
  constructor(
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    code: ErrorCodes = ErrorCodes.CADASTRO_NAO_PODE_SER_REALIZADO,
  ) {
    super('Falha ao cadastrar uma pessoa no banco.', status, code);
  }
}

export class PersonNotFoundException extends AppException {
  constructor(
    status: HttpStatus = HttpStatus.NOT_FOUND,
    code: ErrorCodes = ErrorCodes.DADO_NAO_ENCONTRADO,
  ) {
    super('Falha ao buscar uma pessoa no banco.', status, code);
  }
}

export class PersonFieldRequiredException extends AppException {
  constructor(
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    code: ErrorCodes = ErrorCodes.CAMPO_OBRIGATORIO,
  ) {
    super('Falha ao cadastrar nova pessoa no banco.', status, code);
  }
}

export class PersonFieldDuplicateException extends AppException {
  constructor(
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    code: ErrorCodes = ErrorCodes.DADO_CONFLITANTE,
  ) {
    super('Falha ao cadastrar nova pessoa no banco.', status, code);
  }
}
