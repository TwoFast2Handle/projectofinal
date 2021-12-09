import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import { CardItem } from 'src/app/models/card-item';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  @Input()
  voucherCode: string

  faArrowDown = faArrowDown
  faArrowUp = faArrowUp
  faGripLines = faGripLines
  mappedGames : Array<any>
  sorter: any


  constructor(public cartService: CartServiceService, private route : ActivatedRoute, private router: Router) {
    this.voucherCode = ""
    this.sorter = {
      column: "name",
      direction: false
    }
    this.mappedGames = [] 
  }

  ngOnInit(): void {

    this.mappedGames = this.cartService.cart.items.map( (a)=> {
      
      return a.game.price

    }).filter((a) => {
      return a > 40
    }).map( a=> { return a * 2});
    console.log(this.mappedGames)
   
  }

  addToQuantity(item: any) {
    this.cartService.addToCart(item, 1)
  }

  removeFromQuantity(item: any) {
    this.cartService.removeItem(item, 1)
  }

  voucherInput(voucher: string) {
    this.cartService.voucherApplication(voucher)


    this.voucherCode = ""
  }

  removeDiscount() {
    this.cartService.removeDiscount()
  }

  sort(column: string) {

    this.sorter.column = column
    this.sorter.direction = !this.sorter.direction

    console.log(this.sorter.direction)



    this.cartService.cart.items = this.cartService.cart.items.sort((a: CardItem, b: CardItem): any => {

      if (this.sorter.direction == true) {

        if (this.sorter.column == 'quantity') {

          if (a.quantity < b.quantity) {
            return 1;
          }
          if (a.quantity > b.quantity) {
            return -1;
          }
          return 0;

        } else {

          if (a.game[this.sorter.column] > b.game[this.sorter.column]) {
            return 1;
          }
          if (a.game[this.sorter.column] < b.game[this.sorter.column]) {
            return -1;
          }
          return 0;

        }

      } else {

        if (this.sorter.column == 'quantity') {

          if (a.quantity > b.quantity) {
            return 1;
          }
          if (a.quantity < b.quantity) {
            return -1;
          }
          return 0;

        } else {

          if (a.game[this.sorter.column] < b.game[this.sorter.column]) {
            return 1;
          }
          if (a.game[this.sorter.column] > b.game[this.sorter.column]) {
            return -1;
          }
          return 0;

        }
      }

    })
  }

  navigateToCheckout() {
    this.router.navigate(["checkout"])
  }
}
