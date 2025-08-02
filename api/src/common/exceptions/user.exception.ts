import { AppException } from './app.exception';
import { HttpStatus } from '@nestjs/common';
import { ErrorCodes } from './error-codes.enum';

export class CreateUserException extends AppException {
  constructor(
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    code: ErrorCodes = ErrorCodes.CADASTRO_NAO_PODE_SER_REALIZADO,
  ) {
    super('Falha ao cadastrar um usuário no banco.', status, code);
  }
}

export class UserNotFoundException extends AppException {
  constructor(
    status: HttpStatus = HttpStatus.NOT_FOUND,
    code: ErrorCodes = ErrorCodes.DADO_NAO_ENCONTRADO,
  ) {
    super('Falha ao buscar um usuário no banco.', status, code);
  }
}

export class UserFieldRequiredException extends AppException {
  constructor(
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    code: ErrorCodes = ErrorCodes.CAMPO_OBRIGATORIO,
  ) {
    super('Falha ao cadastrar novo usuário no banco.', status, code);
  }
}

export class UserFieldDuplicateException extends AppException {
  constructor(
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    code: ErrorCodes = ErrorCodes.DADO_CONFLITANTE,
  ) {
    super('Falha ao cadastrar novo usuário no banco.', status, code);
  }
}
