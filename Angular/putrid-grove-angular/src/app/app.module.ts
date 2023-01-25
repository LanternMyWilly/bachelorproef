import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { ItemsComponent } from './components/items/items.component';
import { PayoffsComponent } from './components/payoffs/payoffs.component';
import { UsersComponent } from './components/users/users.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CarouselComponent } from './components/about/carousel/carousel.component';
import { ItemCardComponent } from './components/items/item-card/item-card.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AboutComponent,
    ItemsComponent,
    PayoffsComponent,
    UsersComponent,
    MyaccountComponent,
    HeaderComponent,
    SidebarComponent,
    CarouselComponent,
    ItemCardComponent,
    UnderConstructionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
