import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  readonly name: string;

  @ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
  readonly email: string;

  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  readonly password: string;
}
