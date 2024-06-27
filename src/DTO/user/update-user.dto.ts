import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'John Doe', description: 'The name of the user' })
  readonly name?: string;

  @ApiPropertyOptional({ example: 'user@example.com', description: 'The email of the user' })
  readonly email?: string;

  @ApiPropertyOptional({ example: '321password', description: 'The actual password of the user' })
  readonly currentPassword?: string;

  @ApiPropertyOptional({ example: 'password123', description: 'The password of the user' })
  readonly password?: string;
}
