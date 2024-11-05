import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryResponse } from '../interfaces/category-response';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

 
  private apiUrl = 'https://opentdb.com/api_category.php';  

  constructor(private http: HttpClient) {}

  
  getCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(this.apiUrl);
  }
}
