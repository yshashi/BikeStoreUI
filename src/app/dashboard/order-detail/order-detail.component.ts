import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/service/order.service';
import { orderStatus } from 'src/app/shared/order-staus';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderId = 0;
  orderDetail: any;
  orderStatus = orderStatus;
  subtotal = 0;
  withDiscount = 0;
  constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(val=>{
      this.orderId = +val['id'];
      this.getOrder();
    })
  }

  getOrder(){
    this.orderService.getOrderById(this.orderId)
    .subscribe(res=>{
      console.log(res);
      this.orderDetail = res;
      let sub = 0
      let dis = 0;
      this.orderDetail.orderItems.forEach((a:any) => {
        sub = sub + (a.listPrice * a.quantity);
        dis = dis + (a.listPrice * a.quantity - (a.listPrice * a.quantity * a.discount))
      });

      this.subtotal = sub;
      this.withDiscount = dis;
    })
  }

}
