import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ItemsComponent } from './components/items/items.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { PayoffsComponent } from './components/payoffs/payoffs.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  // public routes
  { path: 'dashboard', component: DashboardComponent },
  { path: 'about', component: AboutComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'payoffs', component: PayoffsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'myaccount', component: MyaccountComponent },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
