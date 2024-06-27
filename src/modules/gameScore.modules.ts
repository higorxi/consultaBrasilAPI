import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameScore } from 'src/entity/score.entity';
import { GameService } from 'src/service/game.service';
import { GameController } from 'src/controller/game.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameScore]),
  ],
  providers: [GameService],
  controllers: [GameController],
})
export class GameScoreModule {}
