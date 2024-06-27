import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameScore } from 'src/entity/score.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameScore)
    private readonly gameScoreRepository: Repository<GameScore>,
  ) {}

  async saveGameScore(userId: string, score: number, advancedSteps: number): Promise<GameScore> {
    let gameScore = await this.gameScoreRepository.findOne({ where: { userId } });

    if (!gameScore) {
      gameScore = new GameScore();
      gameScore.userId = userId;
      gameScore.firstPlayedAt = new Date();
    }

    gameScore.bestScore = Math.max(gameScore.bestScore || 0, score);
    gameScore.totalPlays = (gameScore.totalPlays || 0) + 1;
    gameScore.advancedSteps = Math.max(gameScore.advancedSteps || 0, advancedSteps);
    
    gameScore.updatedAt = new Date();

    return this.gameScoreRepository.save(gameScore);
  }

  async getGameDetails(userId: string): Promise<GameScore | null> {
    return this.gameScoreRepository.findOne({ where: { userId } });
  }

}
