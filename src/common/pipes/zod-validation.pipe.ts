import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform<unknown> {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, { metatype }: ArgumentMetadata): unknown {
    if (!metatype || !this.schema) {
      return value;
    }

    const result = this.schema.safeParse(value);

    if (!result.success) {
      const errors = result.error.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      throw new BadRequestException({
        message: 'Validation failed',
        errors,
      });
    }

    return result.data;
  }
}

export function createZodValidationPipe(schema: ZodSchema): ZodValidationPipe {
  return new ZodValidationPipe(schema);
}
