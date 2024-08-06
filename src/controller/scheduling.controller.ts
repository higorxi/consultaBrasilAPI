import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
  Get,
  Param,
} from '@nestjs/common';
import { SchedulingService } from 'src/service/scheduling.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { Scheduling } from 'src/entity/scheduling.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@ApiTags('scheduling')
@Controller('scheduling')
export class SchedulingController {
  constructor(
    private readonly schedulingService: SchedulingService,
    @InjectRepository(Scheduling)
    private readonly schedulingRepository: Repository<Scheduling>,
  ) {}

  @Post('create-transaction')
  @ApiOperation({ summary: 'Create transaction' })
  @ApiResponse({
    status: 201,
    description: 'Transaction created successfully.',
  })
  async createTransaction(@Body() createSchedulingDto: any) {
    const response = await this.schedulingService.create(createSchedulingDto);

    return response;
  }

  @Post('update-access-data')
  @ApiOperation({ summary: 'Update Access User' })
  @ApiResponse({ status: 201, description: 'Update GOV data.' })
  async updateDATAGov(@Body() dataUpdate: any) {
    const response = await this.schedulingService.updateDataAccess(dataUpdate);
    return response;
  }

}
