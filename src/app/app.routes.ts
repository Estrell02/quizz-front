import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { QuizComponent } from './quiz/quiz.component';
import { ScoreComponent } from './score/score.component';
import { ListscoresComponent } from './listscores/listscores.component';
import { QuizgameComponent } from './quizgame/quizgame.component';


export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
   
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'score', component: ScoreComponent },
  { path: 'listscores', component: ListscoresComponent },
  { path: 'quizgame', component: QuizgameComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' }
];
