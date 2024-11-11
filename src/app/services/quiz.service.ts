import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiUrl = `${environment.apiUrl}/api/quiz`; 

  constructor(private http: HttpClient) {}

  

  getQuestions(categoryId: number, amount: number = 10, difficulty: string = 'medium'): Observable<any> {
    return this.http.get<any>(`https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=multiple&encode=base64`);
  }
  private shuffleOptions(options: string[]): string[] {
    return options.sort(() => Math.random() - 0.5);  
  }

  // getLastScore(): Observable<number> {
  //   return this.http.get<number>(`${this.apiUrl}/user/last-score`);
  // }
}
