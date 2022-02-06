import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export type Cart = {
  id: string;
  items: Item[];
};

export type Item = {
  objectId: string;
  category: string;
  salaryPrice: number;
  name: string;
};

@Injectable()
export class CartService {
  // Use this array as your database
  private carts: Cart[] = [];

  create(): Cart {
    const cart = { id: uuidv4(), items: [] };
    this.carts.push(cart);
    return cart;
  }

  getCart(id: string): Cart {
    if (this.carts && this.carts.length > 0) {
      const cart = this.carts.find((cart: Cart) => cart.id === id);
      if (cart) return cart;
      else throw new Error("The requested cart doesn't exist");
    }
    // throw new Error("The requested cart doesn't exist");
  }

  putItem(id: string, item: Item): Cart {
    if (this.carts && this.carts.length > 0) {
      const cart = this.carts.find((cart: Cart) => cart.id === id);
      console.log('The item is ', item);
      if (cart) {
        cart.items.push(item);
        return cart;
      }
    } else {
      throw new Error("The requested cart doesn't exist");
    }
  }

  deleteItem(carteId: string, itemId: string): Cart {
    if (this.carts && this.carts.length > 0) {
      const cart = this.carts.find((cart: Cart) => cart.id === carteId);
      if (cart) {
        const index = cart.items.findIndex(
          (item: Item) => item.objectId === itemId,
        );
        cart.items.splice(index, 1);
        return cart;
      }
    }
    throw new Error("The requested cart doesn't exist");
  }

  putItems(id: string, items: Item[]): Cart {
    if (this.carts && this.carts.length > 0) {
      const cart = this.carts.find((cart: Cart) => cart.id === id);
      if (cart) cart.items.push(...items);
      else throw new Error("The requested cart doesn't exist");
    }
    throw new Error("The requested cart doesn't exist");
  }
}
