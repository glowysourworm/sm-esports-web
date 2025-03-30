import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {GetUsersResponse, IGetUsersResponse, IUser, IUserResponse, User} from '../model/user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private readonly http: HttpClient;

  // Users -> Post -> Create User
  urlCreate = "http://localhost:4200/users/create";
  urlGetAll = "http://localhost:4200/users/getAll";

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }

  createUser(user: User) : Observable<Object> {

    let httpHeaders = new HttpHeaders();

    httpHeaders.append('Content-Type', 'application/json');
    httpHeaders.append('Accept', '*');
    httpHeaders.append('Access-Control-Allow-Origin', '*');

    let options = {
      headers: httpHeaders,
      params: {
        userName: 'ATestUser'
      },
      withCredentials: true,
      transferCache: {
        includeHeaders: ['content-type', 'accept', '*'],
        includePostRequests: true,
        includeRequestsWithAuthHeaders: true
      }
    };

    return this.http.get(this.urlCreate, options);
  }

   getAllUsers(): Observable<GetUsersResponse> {

     let httpHeaders = new HttpHeaders();

     httpHeaders.append('content-type', 'application/json');
     httpHeaders.append('accept', '*');
     httpHeaders.append('Access-Control-Allow-Origin', '*');

     let options = {
       headers: httpHeaders,
       withCredentials: true,
       transferCache: {
         includeHeaders: ['content-type', 'accept', '*'],
         includePostRequests: true,
         includeRequestsWithAuthHeaders: true
       }
     };

    return this.http.get<GetUsersResponse>(this.urlGetAll, options);
  }
}
