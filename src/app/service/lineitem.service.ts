import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LineItem } from '../models/line-item';

const URL = "http://localhost:8080/api/lineitems"

@Injectable({
  providedIn: 'root'
})
export class LineitemService {

  constructor(private http: HttpClient) { }

  list(): Observable<LineItem[]> {
    return this.http.get(URL + "/") as Observable<LineItem[]>;
  }

  add(lineitem: LineItem): Observable<LineItem> {
    return this.http.post(URL, lineitem) as Observable<LineItem>;
  }

  delete(id: number): Observable<any> {
    return this.http.delete(URL + "/" + id);
  }

  getById(id: number): Observable<LineItem> {
    return this.http.get(URL + "/" + id) as Observable<LineItem>;
  }

  getByReq(reqId: number): Observable<LineItem[]> {
    return this.http.get(URL + "/lines-for-req/" + reqId) as Observable<LineItem[]>
  }

  edit(lineitem: LineItem): Observable<LineItem> {
    return this.http.put(URL + "/" + lineitem.id, lineitem) as Observable<LineItem>;
  }
}
