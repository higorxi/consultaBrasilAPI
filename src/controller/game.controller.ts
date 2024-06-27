import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { GameService } from 'src/service/game.service';
import { SaveGameScoreDto } from 'src/DTO/gameScore/save-gameScore.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'; // Importe os decorators do Swagger

@Controller('game')
@ApiTags('game') 
export class GameController {
  constructor(private readonly gameService: GameService) {}

  /**
   * Salva a pontuação de um jogo para o usuário especificado.
   * @param userId ID do usuário para o qual salvar a pontuação do jogo
   * @param saveGameScoreDto Dados para salvar a pontuação do jogo
   * @returns Retorna a entidade GameScore atualizada
   */
  @Post(':userId/score')
  @ApiOperation({ summary: 'Salva a pontuação do jogo para um usuário específico' })
  @ApiParam({ name: 'userId', description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Pontuação do jogo salva com sucesso' })
  @ApiBearerAuth()
  async saveScore(@Param('userId') userId: string, @Body() saveGameScoreDto: SaveGameScoreDto) {
    const { score, advancedSteps } = saveGameScoreDto;
    const savedGameScore = await this.gameService.saveGameScore(userId, score, advancedSteps);
    return savedGameScore;
  }

  /**
   * Obtém os detalhes do jogo para o usuário especificado.
   * @param userId ID do usuário para o qual obter os detalhes do jogo
   * @returns Retorna os detalhes do jogo ou null se não encontrado
   */
  @Get(':userId/details')
  @ApiOperation({ summary: 'Obtém os detalhes do jogo para um usuário específico' })
  @ApiParam({ name: 'userId', description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Detalhes do jogo obtidos com sucesso' })
  @ApiBearerAuth()
  async getGameDetails(@Param('userId') userId: string) {
    const gameDetails = await this.gameService.getGameDetails(userId);
    return gameDetails;
  }
}
