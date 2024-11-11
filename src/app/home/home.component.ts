import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { QuizService } from '../services/quiz.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports:[NavbarComponent, RouterLink, RouterOutlet],
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  lastScore: number | null = null;

  constructor(private quizService: QuizService ) {}

  ngOnInit(): void {
    // this.fetchLastScore();
  }

  // fetchLastScore(): void {
  //   this.quizService.getLastScore().subscribe(
  //     (score) => {
  //       this.lastScore = score;
  //     },
  //     (error) => {
  //       console.error('Error fetching last score:', error);
  //     }
  //   );
  // }
  
}
