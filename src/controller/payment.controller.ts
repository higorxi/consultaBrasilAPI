import { Controller,Post, Body,} from '@nestjs/common';
import { SchedulingService } from 'src/service/scheduling.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { PaymentService } from 'src/service/payment.service';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly schedulingService: SchedulingService,
    private readonly paymentService: PaymentService
  ) {}

  @Post('webhookPix')
  @ApiOperation({ summary: 'Process CPF' })
  @ApiBody({ type: String })
  @ApiResponse({ status: 200, description: 'CPF processed successfully.' })
  processCPF(@Body() response: any) {
    const { requestBody } = response
    console.log('cheguei aqui', response)
    return this.paymentService.processWebhook(requestBody);
  }

}
