import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { CardItem } from '../models/card-item';
import { CartComponent } from '../components/cart/cart.component';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  public cart: Cart
  constructor() {

    var cart = localStorage.getItem("Cart")
    if (cart) {
      this.cart = JSON.parse(cart)
    }
    else 
      this.cart = new Cart()

  }


  public getCart() : Cart{
      return this.cart
  }

  public setCart(cart : Cart){
    this.cart = cart;
    localStorage.setItem("Cart", JSON.stringify(cart));
    
}

  addToCart(game: any, quantity: number) {

    let item = new CardItem(game, quantity)
    let found = false
    if (this.cart) {

      this.cart.items.forEach((purchase) => {
        if (purchase.game.id == item.game.id) {
          purchase.quantity += quantity
          this.addToTotal(game, quantity, this.cart.discount)
          found = true
          return
        }

      })
      if (found) {
        return
      }
      this.cart.items.push(item)

      this.addToTotal(game, quantity)

    }


    //recalcular totais
    //atualizar no localstorage


  }

  removeItem(item: any, quantity: number) {
    if (this.cart) {
      let index = this.cart.items.findIndex((itemsItem: CardItem) => {
        return item.game.id == itemsItem.game.id
      });
      console.log(index)
      if (index > -1) {
        this.cart.items[index].quantity -= quantity
        this.addToTotal(this.cart.items[index], -quantity);
        if (this.cart.items[index].quantity < 1) {
          this.cart.items.splice(index, 1)
        }
      }
    }
  }

  addToTotal(game: any, quantity: number, discount?: number) {
    if (this.cart) {
     let total = 0
    this.cart.items.forEach(item => {
      total += item.game.price * item.quantity
    })
    console.log(total)
    if (discount) {
      total -= total * discount
      this.cart.discount = discount
    }
    this.cart.totalPrice = total
    console.log(total)
    // this.totalPrice += (game.price * quantity)
    localStorage.setItem("Cart", JSON.stringify(this.cart)) 
    }
    
  }

  // removeFromCart(id: number) {
  //     this.items.slice(id)
  // }

  voucherApplication(voucher: string) {
    if (this.cart) {
      this.cart.discountVouchers.findIndex(vouch => {
      if (vouch[0] == voucher) {
        this.addToTotal(null, 0, vouch[1])
      }
    })
    }

  }

  removeDiscount() {
    this.cart.discount = 0
    this.addToTotal(null, 0, this.cart.discount)
  }

  

}
