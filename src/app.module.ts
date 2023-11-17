import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import Joi from '@hapi/joi';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    AuthModule,
    CartModule,
    OrderModule,
    DatabaseModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})

export class AppModule {
}
