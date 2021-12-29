import { CardItem } from "./card-item";

export class Cart {

    items: Array<CardItem>;
    totalPrice: number;
    discount: number;
    discountVouchers : Array<any>
    adressInfo : any
    paymentInfo : any

    constructor() {
        this.items = []
        this.totalPrice = 0
        this.discount = 0
        this.discountVouchers = [["voucher2021", 0.10],["floop", 0.2], ["DaVinci26", 0.3]]
        this.adressInfo = {}
        this.paymentInfo = {}
    }

    

}