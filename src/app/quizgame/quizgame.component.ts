import { Component, OnInit } from '@angular/core';
import { TriviaService } from '../services/trivia.service';
import { Question } from '../interfaces/question';
import { QuizService } from '../services/quiz.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quizgame',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './quizgame.component.html',
  styleUrls: ['./quizgame.component.scss']
})
export class QuizgameComponent implements OnInit {
  categories: any[] = [];
  questions: Question[] = [];
  selectedQuestions: Question[] = [];
  maxSelectableQuestions: number = 10;
  selectedCategoryId: number | null = null;
  isQuizStarted = false;
  isLoadingQuestions = false;

  constructor(
    private triviaService: TriviaService,
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.triviaService.getCategories().subscribe((response) => {
      this.categories = response.trivia_categories;
    });
  }

  onCategorySelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const categoryId = Number(target.value);
    this.selectedCategoryId = categoryId;
    this.isLoadingQuestions = true;
    this.loadQuestions(categoryId);
  }

  loadQuestions(categoryId: number): void {
    this.quizService.getQuestions(categoryId, 30).subscribe((response) => {
      console.log("Questions chargées:", response.results);
      this.questions = response.results.map((question: { question: string }) => ({
        ...question,
        question: this.decodeBase64(question.question) // Décodage Base64 ici
      }));
      this.selectedQuestions = [];
      this.isLoadingQuestions = false;
      this.isQuizStarted = true;
    });
  }

  toggleQuestionSelection(question: Question): void {
    const isSelected = this.selectedQuestions.includes(question);
    if (isSelected) {
      this.selectedQuestions = this.selectedQuestions.filter((q) => q !== question);
    } else if (this.selectedQuestions.length < this.maxSelectableQuestions) {
      this.selectedQuestions.push(question);
    }
  }

  saveGame(): void {
    // const questionIds = this.selectedQuestions.map((q) => q.question_id);
    // this.triviaService.saveGame({ questionIds }).subscribe((response) => {
    //   console.log("Game saved with reference:", response.referenceNumber);
    //   this.router.navigate(['/game', response.referenceNumber]);
    // });
  }

  // Fonction pour décoder le texte en Base64
  decodeBase64(encodedString: string): string {
    try {
      return atob(encodedString);
    } catch (error) {
      console.error('Erreur de décodage Base64:', error);
      return encodedString; // Retourne le texte inchangé en cas d'erreur
    }
  }
}
