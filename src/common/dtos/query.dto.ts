import {
  IsOptional,
  IsArray,
  IsNumber,
  IsString,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class QueryDto {
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Transform(({ value }) => value.map(Number))
  ids: number[];

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  skip: number = 0;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  count: number = 10;

  @IsOptional()
  @IsString()
  value: string;
}
