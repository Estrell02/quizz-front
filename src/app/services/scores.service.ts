import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {

  constructor() { }

  private quizResults: { 
    score: number;
    date: Date; 
    category: string; 
    difficulty: string }[] = [];

  addResult(score: number, category: string, difficulty: string): void {
    this.quizResults.push({ score, date: new Date(), category, difficulty });
  }

  getResults(): { score: number; date: Date; category: string; difficulty: string }[] {
    return this.quizResults;
  }
}
