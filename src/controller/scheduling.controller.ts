import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { SchedulingService } from 'src/service/scheduling.service';
//import { CreateSchedulingDto } from './dto/create-scheduling.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('scheduling')
@Controller('scheduling')
export class SchedulingController {
  constructor(private readonly schedulingService: SchedulingService) {}

  @Post('process-cpf')
  @ApiOperation({ summary: 'Process CPF' })
  @ApiBody({ type: String })
  @ApiResponse({ status: 200, description: 'CPF processed successfully.' })
  processCPF(@Body() cpf: string) {
    return this.schedulingService.validateCPF(cpf);
  }

  @Post('create-transaction')
  @ApiOperation({ summary: 'Create transaction' })
  //@ApiBody({ type: CreateSchedulingDto })
  @ApiResponse({ status: 201, description: 'Transaction created successfully.' })
  createTransaction(@Body() createSchedulingDto: any) {
    return this.schedulingService.create(createSchedulingDto);
  }

}
