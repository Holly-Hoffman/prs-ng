import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users';
import { UserLogin } from '../models/user-login';

const URL = "http://localhost:8080/api/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  list(): Observable<Users[]> {
    return this.http.get(URL + "/") as Observable<Users[]>;
  }

  add(user: Users): Observable<Users> {
    return this.http.post(URL, user) as Observable<Users>;
  }

  //observable<any> = placeholder w/no content
  delete(id: number): Observable<any> {
    return this.http.delete(URL + "/" + id);
  }

  getById(id: number): Observable<Users> {
    return this.http.get(URL + "/" + id) as Observable<Users>;
  }

  edit(user: Users): Observable<Users> {
    return this.http.put(URL + "/" + user.id, user) as Observable<Users>;
  }

  login(userLogin: UserLogin): Observable<Users> {
    return this.http.post(URL + '/login', userLogin) as Observable<Users>;
  }
}
