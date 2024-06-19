import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CustomParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): number {
    if (metadata.type !== 'param') {
      return value;
    }
    const transformedValue = +value;
    if (isNaN(transformedValue)) {
      throw new BadRequestException(
        `Validation failed: ${metadata.data} must be an integer.`,
      );
    }
    return transformedValue;
  }
}
