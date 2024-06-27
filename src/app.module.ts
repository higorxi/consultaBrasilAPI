import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { UserModule } from './modules/user.modules';
import { AuthModule } from './modules/auth.modules';
import { BadgeModule } from './modules/badge.modules';
import { GameScoreModule } from './modules/gameScore.modules';
import { AuthMiddleware } from './middleware/auth';
import { AdminMiddleware } from './middleware/adminMiddleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    BadgeModule,
    GameScoreModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .forRoutes(
      { path : 'users', method: RequestMethod.GET},
      { path : 'badges', method: RequestMethod.POST},
    );

    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'users/create', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth', method: RequestMethod.GET }
      ) 
      .forRoutes('*'); 
  }
}
