import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  slides: any[] = new Array(3).fill({
    id: -1,
    src: '',
    title: '',
    subtitle: '',
  });

  constructor() {}

  ngOnInit(): void {
    this.slides[0] = {
      src: 'https://picsum.photos/200/300',
    };
    this.slides[1] = {
      src: 'https://picsum.photos/200/300',
    };
    this.slides[2] = {
      src: 'https://picsum.photos/200/300',
    };
  }
}
