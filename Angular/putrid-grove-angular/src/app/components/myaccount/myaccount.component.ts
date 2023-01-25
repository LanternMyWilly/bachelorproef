import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css'],
})
export class MyaccountComponent {
  constructor(private meta: Meta) {
    this.meta.addTag({
      name: "A placeholder for the coming account management system. You'll be able to edit or add information",
      title: 'Putrid Grove | MyAccount',
    });
  }
}
