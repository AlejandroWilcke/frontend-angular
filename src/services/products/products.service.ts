import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { devEnvironment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  constructor(
    private http: HttpClient
  ) { }

  getProducts(category: string = '', limit: number = 20) {
    const { productsURL, productsByCategoryURL } = devEnvironment;
    if(!category){
      return this.http.get(`${productsURL}?limit=${limit}`)
    }else{
      return this.http.get(`${productsByCategoryURL}/${category}?limit=${limit}`)
    }
  }
}
