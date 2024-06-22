import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  
  @ValidatorConstraint({ async: false })
  export class IsNotPasswordConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
      return !value.hasOwnProperty('password');
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'Password cannot be updated through this route';
    }
  }
  
  export function IsNotPassword(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsNotPasswordConstraint,
      });
    };
  }
  