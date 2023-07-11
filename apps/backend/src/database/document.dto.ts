import { ApiProperty } from '@nestjs/swagger';
import { Document } from '@naite/types';

export class DocumentDto implements Document {
  @ApiProperty({ readOnly: true, format: 'uuid' })
  public readonly id!: string;

  @ApiProperty({ readOnly: true, type: Date })
  public readonly created_at!: Date;

  @ApiProperty({ readOnly: true, type: Date })
  public readonly updated_at!: Date;
}
