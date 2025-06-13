import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  IsISO8601,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateShortUrlDto {
  @IsUrl({}, { message: 'Invalid URL' })
  originalUrl: string;

  @IsOptional()
  @IsString()
  @MinLength(4, { message: 'Alias must be at least 4 characters' })
  @MaxLength(20, { message: 'Alias must be at most 20 characters' })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'Alias can contain only letters and digits',
  })
  alias?: string;

  @IsOptional()
  @IsISO8601({}, { message: 'Invalid expiration date format' })
  expiresAt?: string;
}
