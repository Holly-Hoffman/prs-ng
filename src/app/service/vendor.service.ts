import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendor } from '../models/vendor';

const URL = "http://localhost:8080/api/vendors";

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient) { }

  list(): Observable<Vendor[]> {
    return this.http.get(URL + "/") as Observable<Vendor[]>;
  }

  add(vendor: Vendor): Observable<Vendor> {
    return this.http.post(URL, vendor) as Observable<Vendor>;
  }

  delete(id: number): Observable<any> {
    return this.http.delete(URL + "/" + id);
  }

  getById(id: number): Observable<Vendor> {
    return this.http.get(URL + "/" + id) as Observable<Vendor>;
  }

  edit(vendor: Vendor): Observable<Vendor> {
    return this.http.put(URL + "/" + vendor.id, vendor) as Observable<Vendor>;
  }
}
