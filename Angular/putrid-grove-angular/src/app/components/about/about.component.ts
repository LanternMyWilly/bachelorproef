import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  constructor(private meta: Meta) {
    this.meta.addTag({
      name: 'Putrid Grove | About',
      title:
        'This page gives a little explanation about the app and what it stands for.',
    });
  }
}
