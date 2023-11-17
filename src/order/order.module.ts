import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderService } from './services';
import { DatabaseModule } from '../database/database.module';
import { Order } from '../database/entities/order.entity';
import { OrderController } from './order.controller';

@Module({
  imports: [ TypeOrmModule.forFeature([Order]), DatabaseModule ],
  providers: [ OrderService ],
  controllers: [ OrderController ]
})
export class OrderModule {}
