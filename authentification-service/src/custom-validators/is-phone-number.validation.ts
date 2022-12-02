import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

export function IsPhoneNumber(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          const relatedValue = (args.object as any)[relatedPropertyName]
          return typeof value === 'string' && typeof relatedValue === 'string' && value.length > relatedValue.length
        },
      },
    })
  }
}

// НЕ СДЕЛАНО