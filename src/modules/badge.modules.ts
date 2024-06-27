import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BadgeService } from 'src/service/badge.service';
import { BadgeController } from 'src/controller/badge.controller';
import { Badge } from 'src/entity/badge.entity';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Badge, User]),
  ],
  providers: [BadgeService],
  controllers: [BadgeController],
})
export class BadgeModule {}
