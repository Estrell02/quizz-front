import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { QuizService } from '../services/quiz.service';

import { Category } from '../interfaces/category';

import { TriviaService } from '../services/trivia.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Question } from '../interfaces/question';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule,  HttpClientModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent  implements OnInit {
  categories: any[] = [];
  isQuizStarted: boolean = false;
  // questions: Question[] = [];
  questions: (Question & { shuffledOptions: string[] })[] = [];
  currentQuestionIndex: number = 0;
  userAnswer: string = '';
  @Output() score: number = 0;
  isQuizFinished: boolean = false;
  timeRemaining: number = 30; // Durée du timer en secondes
  timer: any;

  constructor(private triviaService: TriviaService, private quizService:QuizService
    ,
    private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.triviaService.getCategories().subscribe((response) => {
      this.categories = response.trivia_categories;
    });
  }

  onCategorySelect(categoryId: number): void {
    this.isQuizStarted = true;
    this.loadQuestions(categoryId);
  }
  decodeBase64(encoded: string): string {
    return atob(encoded);
  }

  loadQuestions(categoryId: number): void {
    this.quizService.getQuestions(categoryId, 10).subscribe((response) => {
      this.questions = response.results.map((question: Question) => ({
        ...question,
        question: this.decodeBase64(question.question),
        correct_answer: this.decodeBase64(question.correct_answer),
        incorrect_answers: question.incorrect_answers.map(answer => this.decodeBase64(answer)),
        // Mélange les options une seule fois et les stocke dans shuffledOptions
        shuffledOptions: this.shuffleOptions([
          ...question.incorrect_answers.map(answer => this.decodeBase64(answer)),
          this.decodeBase64(question.correct_answer)
        ])
      }));
      this.startTimer();
    });
  }

  shuffleOptions(options: string[]): string[] {
    const shuffled = [...options];  // Crée une copie pour ne pas modifier l'original
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  startTimer(): void {
    this.timer = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        this.finishQuiz();
      }
    }, 1000);
  }

  answerQuestion(selectedAnswer: string): void {
    if (selectedAnswer === this.questions[this.currentQuestionIndex].correct_answer) {
      this.score++;
    }
    this.nextQuestion(); // Passer à la question suivante après avoir répondu
  }

  nextQuestion(): void {
    this.currentQuestionIndex++;
    this.timeRemaining = 30; // Réinitialiser le timer pour la prochaine question

    if (this.currentQuestionIndex >= this.questions.length) {
      this.finishQuiz(); // Si toutes les questions ont été posées, terminer le quiz
    }
  }

  finishQuiz(): void {
    clearInterval(this.timer);
    this.isQuizFinished = true;
  
    // Temps total écoulé pour les questions
    const totalTimeElapsed = 10 * 30 - this.timeRemaining; // Supposons 10 questions avec un timer de 30 secondes
  
    this.router.navigate(['/score'], {
      queryParams: {
        score: this.score,
        correctAnswers: this.score, // Utilise `score` pour le nombre de bonnes réponses
        totalQuestions: this.questions.length,
        timeElapsed: totalTimeElapsed,
        
      },
    });
  }

  restartQuiz(): void {
    this.isQuizStarted = false;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.isQuizFinished = false;
    this.timeRemaining = 30; // Réinitialiser le timer
  }

  
}

