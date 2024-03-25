import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { devEnvironment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  constructor(
    private http: HttpClient
  ) { }

  getCategories() {
    return this.http.get(devEnvironment.categoriesURL)
  }

}
