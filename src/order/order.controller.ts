import { Controller, Get, HttpStatus, Param, Body, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from './services';

@ApiTags('Order')
@Controller('api/profile/order')
export class OrderController {
  constructor(
    private orderService: OrderService,
  ) {
  }

  @Get()
  async getAllOrders() {
    const orders = await this.orderService.findAll();

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { orders },
    };
  }

  @Put()
  async submitOrder(@Body() body) {
    // TODO: Implement
    console.log('submitOrder', 'body', body);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {},
    };
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    const order = await this.orderService.findOne(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order },
    };
  }

  @Put(':id/status')
  async putStatusById(@Param('id') id: string, @Body() body) {
    // TODO: Implement
    console.log('putStatusById id', id);
    console.log('putStatusById body', body);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {},
    };
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    // TODO: Implement
    console.log('deleteById id', id);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {},
    };
  }
}
