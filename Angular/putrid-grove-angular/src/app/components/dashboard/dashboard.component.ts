import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import User from 'src/app/models/user';
import { Service } from 'src/app/services/service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  highestTotalUser!: any;
  itemsCount!: number;
  usersCount!: number;
  randomQuote!: string;

  constructor(public service: Service, private meta: Meta) {
    this.meta.addTag({
      name: 'PutridGrove landing page',
      title:
        'PutridGrove, an application made to make live easier at Putrid Grove',
    });
  }

  loadHighestTotaluser() {
    this.service.loadHighestTotalUser().subscribe((resp: any) => {
      this.highestTotalUser = resp;
    });
  }

  loadItemsCount() {
    this.service.loadItemsCount().subscribe((resp: any) => {
      this.itemsCount = resp;
    });
  }

  loadUsersCount() {
    this.service.loadUsersCount().subscribe((resp: any) => {
      this.usersCount = resp;
    });
  }

  loadRandomQuote() {
    this.service.loadRandomQuote().subscribe((resp: any) => {
      this.randomQuote = resp;
    });
  }

  ngOnInit(): void {
    this.loadHighestTotaluser();
    this.loadItemsCount();
    this.loadUsersCount();
    this.loadRandomQuote();
  }
}
