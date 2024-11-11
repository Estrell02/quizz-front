import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CategoryResponse } from '../interfaces/category-response';
import { environment } from '../../environments/environment';
import { Question } from '../interfaces/question';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

 
  private apiUrl = `${environment.apiUrl}`; 

  constructor(private http: HttpClient) {}

  
  
  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api_category.php`);
  }
  getQuestions(categoryId: number, amount: number = 10): Observable<Question[]> {
    return this.http.get<{ results: any[] }>(`${this.apiUrl}?amount=${amount}&category=${categoryId}`).pipe(
      map((response: { results: any[]; }) => response.results.map(item => this.formatQuestion(item)))
    );
  }

  private formatQuestion(item: any): Question {
    return {
      category: item.category,
      type: item.type,
      difficulty: item.difficulty,
      question: item.question,
      correct_answer: item.correct_answer,
      incorrect_answers: item.incorrect_answers
    };
}
}
