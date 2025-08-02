import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsPastDate', async: false })
export class IsPastDateConstraint implements ValidatorConstraintInterface {
  validate(value: string, _args: ValidationArguments) {
    if (!value) return false;
    const date = new Date(value);
    const now = new Date();
    return !isNaN(date.getTime()) && date < now;
  }
  defaultMessage(_args: ValidationArguments) {
    return 'A data deve ser uma data válida e anterior à data atual';
  }
}
