import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-payoffs',
  templateUrl: './payoffs.component.html',
  styleUrls: ['./payoffs.component.css']
})
export class PayoffsComponent {
  constructor(private meta: Meta) {
    this.meta.addTag({
      name: "A placeholder for the coming payoff system where you'll be able to see all your current payoffs and where you will be able to add a payment.",
      title: 'Putrid Grove | Payoffs',
    });
  }
}
