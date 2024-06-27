import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { BadgeService } from 'src/service/badge.service';
import { CreateBadgeDto } from 'src/DTO/badge/create-badger.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'; 

@Controller('badges')
@ApiTags('badges') 
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  /**
   * Cria um novo emblema com base nos dados fornecidos.
   * @param createBadgeDto Dados para criar o emblema
   * @returns Retorna o emblema criado
   */
  @Post()
  @ApiOperation({ summary: 'Cria um novo emblema' })
  @ApiResponse({ status: 201, description: 'Emblema criado com sucesso' })
  @ApiBearerAuth()
  createBadge(@Body() createBadgeDto: CreateBadgeDto) {
    return this.badgeService.createBadge(createBadgeDto);
  }

  /**
   * Atribui aleatoriamente um emblema para o usuário especificado.
   * @param userId ID do usuário para atribuir um emblema aleatório
   * @returns Retorna o emblema atribuído aleatoriamente
   */
  @Post('assign-random/:userId')
  @ApiOperation({ summary: 'Atribui aleatoriamente um emblema para um usuário' })
  @ApiParam({ name: 'userId', description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Emblema atribuído aleatoriamente com sucesso' })
  @ApiBearerAuth()
  assignRandomBadge(@Param('userId') userId: string) {
    return this.badgeService.assignRandomBadge(userId);
  }

  /**
   * Obtém todos os emblemas cadastrados.
   * @returns Retorna uma lista de todos os emblemas cadastrados
   */
  @Get()
  @ApiOperation({ summary: 'Obtém todos os emblemas cadastrados' })
  @ApiResponse({ status: 200, description: 'Lista de emblemas obtida com sucesso' })
  @ApiBearerAuth()
  findAllBadges() {
    return this.badgeService.findAllBadges();
  }

  /**
   * Obtém todos os emblemas de um usuário específico.
   * @param userId ID do usuário para obter os emblemas
   * @returns Retorna uma lista de emblemas do usuário especificado
   */
  @Get('user/:userId')
  @ApiOperation({ summary: 'Obtém todos os emblemas de um usuário específico' })
  @ApiParam({ name: 'userId', description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Lista de emblemas do usuário obtida com sucesso' })
  @ApiBearerAuth()
  findBadgesByUserId(@Param('userId') userId: string) {
    return this.badgeService.findBadgesByUserId(userId);
  }
}
