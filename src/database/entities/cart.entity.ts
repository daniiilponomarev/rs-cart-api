import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { Status } from './enums';

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'date', nullable: false })
  createdAt: Date;

  @Column({ type: 'date', nullable: false })
  updatedAt: Date;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @OneToMany(() => CartItem, (item) => item.cart, { cascade: true })
  @JoinColumn({ name: 'id', referencedColumnName: 'cart_id' })
  items: CartItem[];
}
