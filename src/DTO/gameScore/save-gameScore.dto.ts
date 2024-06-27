import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaveGameScoreDto {
  @ApiProperty({ description: 'The score achieved in the game', minimum: 0 })
  @IsInt()
  @Min(0)
  score: number;

  @ApiProperty({ description: 'The number of advanced steps achieved in the game', minimum: 0 })
  @IsInt()
  @Min(0)
  advancedSteps: number;
}
