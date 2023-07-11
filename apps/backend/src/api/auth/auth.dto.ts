import { ApiProperty } from '@nestjs/swagger';
import { Auth } from '@naite/types';
import { IsBoolean, IsOptional } from 'class-validator';

export class AuthDto implements Auth {
  @IsBoolean()
  @ApiProperty({ readOnly: true, type: Boolean })
  public readonly authenticated: boolean;

  @IsOptional()
  @ApiProperty({ readOnly: true })
  public readonly userId?: string;
}
