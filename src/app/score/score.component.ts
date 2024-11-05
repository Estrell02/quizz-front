import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-score',
  standalone: true,
  imports: [],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss'
})
export class ScoreComponent implements OnInit {
  


  @Input() score: number = 0; // Le score final de l'utilisateur
  @Input() correctAnswers: number = 0; // Le nombre de bonnes réponses
  @Input() totalQuestions: number = 10; // Le nombre total de questions
  @Input() timeElapsed: number = 0; // Le temps écoulé pour le quiz

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.score = +params['score'] || 0;
      this.totalQuestions = +params['totalQuestions'] || 0;
      this.correctAnswers = +params['correctAnswers'] || 0;
      this.timeElapsed = (+params['totalQuestions']*30 -params['timeElapsed'] )|| 0;
    });
  }
  

  // Fonction pour recommencer le quiz
  restartQuiz(): void {
    this.router.navigate(['/quiz']); 
  }

  // Fonction pour retourner à la page d'accueil
  goHome(): void {
    this.router.navigate(['/home']); 
  }

  
}
