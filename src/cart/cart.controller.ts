import { Controller, Get, Put, Body, Req, Param, HttpStatus } from '@nestjs/common';
import { AppRequest } from '../shared';

import { ApiTags } from '@nestjs/swagger';
import { CartService } from './services';

@ApiTags('Cart')
@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
  ) {
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Put()
  async updateUserCart(@Req() req: AppRequest, @Body() body) {
    // TODO: implement
    console.log('updateUserCart', 'body', body);
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { req },
    };
  }

  @Get()
  async getAllCarts() {
    const carts = await this.cartService.findAll();

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { carts },
    };
  }

  @Get(':id')
  async getCartById(@Param('id') id: string) {
    const cart = await this.cartService.findOne(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart },
    };
  }
}
