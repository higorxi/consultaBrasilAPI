import { Controller,Post, Body, HttpCode,} from '@nestjs/common';
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
  @ApiOperation({ summary: 'Process Webhook' })
  @ApiBody({ type: String })
  @ApiResponse({ status: 200, description: 'Webhook processed successfully.' })
  @HttpCode(200)
  async processWebhook(@Body() response: any) {
    const { requestBody } = response
    await this.paymentService.processWebhook(requestBody);
    return;
  }

  @Post('schedulingRefund')
  @ApiOperation({ summary: 'Process CPF' })
  @ApiBody({ type: String })
  @ApiResponse({ status: 200, description: 'CPF processed successfully.' })
  processRefund(@Body() response: any) {
    const { requestBody } = response
    return this.paymentService.processWebhook(requestBody);
  }

}
