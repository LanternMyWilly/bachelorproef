import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  constructor(private meta: Meta) {
    this.meta.addTag({
      name: "A placeholder for the coming page to get an overview of all registered users. You'll be able to manage all users.",
      title: 'Putrid Grove | User',
    });
  }
}
