import { Component, Input, OnInit } from '@angular/core';
import Item from 'src/app/models/item';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css'],
})
export class ItemCardComponent implements OnInit {
  @Input() item!: Item;

  calculateRemainingAmount(): number {
    let remainingAmount: number = this.item.price;

    this.item.itemPayOffs.map((itemPayOff: any) => {
      remainingAmount -= itemPayOff.amount;
    });
    return Math.round(remainingAmount * 100) / 100;
  }

  ngOnInit(): void {}
}
