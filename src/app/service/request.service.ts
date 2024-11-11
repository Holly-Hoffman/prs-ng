import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from '../models/request';
import { RequestForm } from '../models/request-form';

const URL = "http://localhost:8080/api/requests"

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  list(): Observable<Request[]> {
    return this.http.get(URL + "/") as Observable<Request[]>;
  }

  add(request: RequestForm): Observable<RequestForm> {
    return this.http.post(URL, request) as Observable<RequestForm>;
  }

  delete(id: number): Observable<any> {
    return this.http.delete(URL + "/" + id);
  }

  getById(id: number): Observable<Request> {
    return this.http.get(URL + "/" + id) as Observable<Request>;
  }

  //this is in li-list as it will be submitted from that page.
  review(request: Request): Observable<Request> {
    return this.http.put(URL + "/submit-review/" + request.id, request) as Observable<Request>;
  }

  inReviewById(id: number): Observable<Request[]> {
    return this.http.get(URL + "/list-review/" + id) as Observable<Request[]>;
  }

  approve(request: Request): Observable<Request> {
    return this.http.put(URL + "/approve/" + request.id, request) as Observable<Request>;
  }

  reject(request: Request): Observable<Request> {
    return this.http.put(URL + "/reject/" + request.id, request) as Observable<Request>;
  }

  edit(request: Request): Observable<Request> {
    return this.http.put(URL + "/" + request.id, request) as Observable<Request>;
  }
}
