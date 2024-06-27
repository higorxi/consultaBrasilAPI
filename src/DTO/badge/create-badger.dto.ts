import { ApiProperty } from '@nestjs/swagger';

export class CreateBadgeDto {
  @ApiProperty({ description: 'Slug of the badge' })
  slug: string;

  @ApiProperty({ description: 'Name of the badge' })
  name: string;

  @ApiProperty({ description: 'URL of the badge image' })
  image: string;

  @ApiProperty({ description: 'Type of the badge: bronze, prata, or ouro' })
  type: 'bronze' | 'prata' | 'ouro';
}
