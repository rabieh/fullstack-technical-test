import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Cart, CartService, Item } from './cart.service';

@Controller('/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {
  }

  @Get('/:id')
  getCart(@Param('id') id: string): Cart {
    return this.cartService.getCart(id);
  }

  @Post('/')
  createCart(): Cart {
    return this.cartService.create();
  }

  @Post('/:id')
  addToCart(@Param('id') id: string, @Body() item: Item): Cart {
    return this.cartService.putItem(id, item);
  }

  @Delete('/:cartId/:itemId')
  deleteItem(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
  ): Cart {
    return this.cartService.deleteItem(cartId, itemId);
  }
}
