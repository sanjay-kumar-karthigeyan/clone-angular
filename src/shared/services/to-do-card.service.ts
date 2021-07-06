import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Card } from '../interface/card';

@Injectable({
  providedIn: 'root',
})
export class ToDoCardService {
  readonly baseUrl = environment.apiURL + '/card';

  constructor(private http: HttpClient) {}

  getCardData = async () => {
    return this.http
      .get<any>(this.baseUrl)
      .pipe(
        map((result) => {
          return {
            success: result.success,
            userData: result.data.map((user) => {
              return {
                _id: user._id,
                name: user.name,
                surname: user.surname,
                description: user.description,
              } as Card;
            }),
            message: result.message,
          };
        })
      )
      .toPromise();
  };

  createCardData = async (data: Card) => {
    console.log('http');
    return this.http
      .post<any>(this.baseUrl, data)
      .pipe(
        map((result) => {
          return {
            success: result.success,
            userData: result.data as Card,
            message: result.message,
          };
        })
      )
      .toPromise();
  };

  deleteCardData = async (id: string) => {
    console.log("this.baseUrl",this.baseUrl + `/${id}`)
    return this.http.delete<any>(this.baseUrl + `/${id}`).toPromise();
  };

}
