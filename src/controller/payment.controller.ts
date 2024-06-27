import { Controller,Post, Body,} from '@nestjs/common';
import { SchedulingService } from 'src/service/scheduling.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly schedulingService: SchedulingService) {}

  @Post('payment-cpf')
  @ApiOperation({ summary: 'Process CPF' })
  @ApiBody({ type: String })
  @ApiResponse({ status: 200, description: 'CPF processed successfully.' })
  processCPF(@Body() cpf: string) {
    return //this.schedulingService.processCPF(cpf);
  }

  @Post('payment-transaction')
  @ApiOperation({ summary: 'Create transaction' })
  //@ApiBody({ type: CreateSchedulingDto })
  @ApiResponse({ status: 201, description: 'Transaction created successfully.' })
  createTransaction(@Body() createSchedulingDto: any) {
    return //this.schedulingService.create(createSchedulingDto);
  }

  @Post('payment')
  @ApiOperation({ summary: 'Create transaction' })
  //@ApiBody({ type: CreateSchedulingDto })
  @ApiResponse({ status: 201, description: 'Transaction created successfully.' })
  createPIX(@Body() createPIX: any) {
    return //this.schedulingService.createPIXTESTE(createPIX);
  }
}
