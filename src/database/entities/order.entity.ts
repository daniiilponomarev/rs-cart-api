import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OrderStatus } from './enums';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  cartId: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'json', nullable: false })
  payment: {
    type: string,
    address?: any,
    creditCard?: any,
  };

  @Column({ type: 'json', nullable: false })
  delivery: {
    type: string,
    address: any,
  };

  @Column({ type: 'text' })
  comments: string;

  @Column({ type: 'enum', enum: OrderStatus })
  status: OrderStatus;

  @Column({ type: 'integer' })
  total: number;
}
