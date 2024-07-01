import { Controller, Post, Body, InternalServerErrorException } from '@nestjs/common';
import { SchedulingService } from 'src/service/scheduling.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('scheduling')
@Controller('scheduling')
export class SchedulingController {
  constructor(private readonly schedulingService: SchedulingService) {}

  @Post('process-cpf')
  @ApiOperation({ summary: 'Process CPF' })
  @ApiResponse({ status: 200, description: 'CPF processed successfully.' })
  async processCPF(@Body() body: { cpf: string }) {
    const { cpf } = body; 
    try {
      const result = await this.schedulingService.validateCPF(cpf);
      return result;
    } catch (error) {
      console.error('Erro ao processar CPF:', error);
      throw new InternalServerErrorException('Erro ao processar CPF');
    }
  }

  @Post('create-transaction')
  @ApiOperation({ summary: 'Create transaction' })
  @ApiResponse({ status: 201, description: 'Transaction created successfully.' })
  async createTransaction(@Body() createSchedulingDto: any) {
    
    const response = await this.schedulingService.create(createSchedulingDto)
    
    return response;
  }

  @Post('update-access-data')
  @ApiOperation({ summary: 'Update Access User' })
  @ApiResponse({ status: 201, description: 'Update GOV data.' })
  async updateDATAGov(@Body() dataUpdate: any) {
    
    const response = await this.schedulingService.updateDataAccess(dataUpdate)
    
    return response;
  }

}
