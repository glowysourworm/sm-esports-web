import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {Observable, of, ValueFromArray} from 'rxjs';
import {IGetUsersResponse, IUser, IUserResponse, User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private readonly http: HttpClient;

  // Users -> Post -> Create User
  urlCreate = "api/users/create";
  urlGetAll = "api/users/getAll";

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }

  createUser(user: User): Observable<IUserResponse> {
    let httpHeaders = new HttpHeaders();

    httpHeaders.append('Content-Type', 'application/json')
    httpHeaders.append('X-Debug-Level', 'verbose');

    let options = {
      headers: httpHeaders
    };

    return this.http.post<IUserResponse>(this.urlCreate, JSON.stringify(user), options);
  }

  getAllUsers(): Observable<IGetUsersResponse> {
    return this.http.get<IGetUsersResponse>(this.urlGetAll);
  }
}
