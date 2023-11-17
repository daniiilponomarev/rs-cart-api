import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../database/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>
  ) {}

  async findAll() {
    try {
      return await this.ordersRepository.find();
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async findOne(id: string) {
    try {
      return await this.ordersRepository.findOneBy({ id });
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
