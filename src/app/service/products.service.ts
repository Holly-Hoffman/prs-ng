import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../models/products';
import { Observable } from 'rxjs';

const URL = "http://localhost:8080/api/products"

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  list(): Observable<Products[]> {
    return this.http.get(URL + "/") as Observable<Products[]>;
  }

  add(product: Products): Observable<Products> {
    return this.http.post(URL, product) as Observable<Products>;
  }

  delete(id: number): Observable<any> {
    return this.http.delete(URL + "/" + id);
  }

  getById(id: number): Observable<Products> {
    return this.http.get(URL + "/" + id) as Observable<Products>;
  }

  edit(product: Products): Observable<Products> {
    return this.http.put(URL + "/" + product.id, product) as Observable<Products>;
  }
}
