import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss'
})
export class ScoreComponent implements OnInit {
  


  @Input() score: number = 0; 
  @Input() correctAnswers: number = 0; 
  @Input() totalQuestions: number = 10; 
  @Input() timeElapsed: number = 0;

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.score = +params['score'] || 0;
      this.totalQuestions = +params['totalQuestions'] || 0;
      this.correctAnswers = +params['correctAnswers'] || 0;
      this.timeElapsed = +params['timeElapsed'] || 0;
    });
  }
  

  restartQuiz(): void {
    this.router.navigate(['/quiz']); 
  }


  goHome(): void {
    this.router.navigate(['/home']); 
  }

  
}
