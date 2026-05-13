import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [RouterLink, Header, Footer],
  templateUrl: './checkout-success.html',
  styleUrl: './checkout-success.css'
})
export class CheckoutSuccess {
  orderNumber = 'BS-' + new Date().getTime().toString().slice(-8);
  orderDate = new Date().toLocaleDateString('fr-CM', { day: '2-digit', month: 'long', year: 'numeric' });
  estimatedDelivery = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toLocaleDateString('fr-CM', { day: '2-digit', month: 'long', year: 'numeric' });
  })();
}
