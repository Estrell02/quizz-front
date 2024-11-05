import { Question } from "./question";

export interface Quizgame {
    categoryId: number;
    questions: Question[];
    currentQuestionIndex: number;
    score: number;
    timeLeft: number;  
    isFinished: boolean;
}
