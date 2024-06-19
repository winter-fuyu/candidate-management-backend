import {
  IsString,
  IsEmail,
  IsOptional,
  IsUrl,
  Length,
  IsNotEmpty,
} from 'class-validator';

export class CreateCandidateDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  lastName: string;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  phoneNumber?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  callTimeInterval?: string;

  @IsOptional()
  @IsUrl()
  linkedinUrl?: string;

  @IsOptional()
  @IsUrl()
  githubUrl?: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 1000)
  comment: string;
}
