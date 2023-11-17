import { PrimaryColumn, Column, Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from './product.entity';

@Entity({ name: 'cart_items' })
export class CartItem {
  @PrimaryColumn({ type: 'uuid' })
  cartId: string;

  @Column({ type: 'uuid' })
  productId: string;

  @Column({ type: 'integer' })
  count: number;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart: Cart;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;
}
