// app.module.ts

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { SchedulingModule } from './modules/scheduling.modules';
import { PaymentModule } from './modules/payment.modules';
import { WebhookMiddleware } from './middleware/webhook';
@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), SchedulingModule, PaymentModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(WebhookMiddleware) 
      .forRoutes('payments/webhookPix'); 
  }
}
