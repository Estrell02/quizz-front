import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { QuizComponent } from '../quiz/quiz.component';
import { QuizgameComponent } from '../quizgame/quizgame.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports:[HomeComponent, LoginComponent, RegisterComponent, RouterLink, RouterOutlet, QuizComponent,
    QuizgameComponent
  ],
  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  title = 'Quiz Gamified';
  constructor(private router: Router) { } 

  ngOnInit(): void {}
  goToLogin() {
    this.router.navigate(['/login']); 
  }

}
