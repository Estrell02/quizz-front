import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listscores',
  standalone: true,
  imports: [],
  templateUrl: './listscores.component.html',
  styleUrl: './listscores.component.scss'
})
export class ListscoresComponent implements OnInit{
  // Stocke les résultats des quiz
  quizResults: { score: number; date: Date; settings: any }[] = [];

  ngOnInit(): void {
    
  }

}
