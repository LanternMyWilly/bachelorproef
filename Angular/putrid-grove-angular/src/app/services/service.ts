import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import User from '../models/user';
import Item from '../models/item';
import ItemRequest from '../models/itemRequest';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private url: string = `${environment.apiEndpoint}`;

  constructor(private http: HttpClient) {}

  loadItemsCount(): Observable<number> {
    let url = `${this.url}/items/count`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  loadUsersCount(): Observable<number> {
    let url = `${this.url}/users/count`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  loadHighestTotalUser(): Observable<string> {
    let url = `${this.url}/users/highesttotaluser`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  loadItems(): Observable<any> {
    let url = `${this.url}/items/all`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  loadRandomQuote(): Observable<string> {
    let url = 'https://api.quotable.io/random?minLength=140';
    return this.http.get(url).pipe(
      map((response: any) => {
        return response.content;
      })
    );
  }

  addItem(item: ItemRequest): Observable<any> {
    let url = `${this.url}/items`;
    return this.http.post(url, item);
  }
}
