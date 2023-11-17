import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../../database/entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async findAll() {
    try {
      return await this.cartRepository.find();
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async findOne(id: string) {
    try {
      return await this.cartRepository.findOneBy({ id });
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
