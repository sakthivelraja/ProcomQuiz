import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes, Router} from '@angular/router';
import {WelcomeComponent } from './welcome/welcome.component';
import { QuizComponent } from './quiz/quiz.component';

const appRoutes: Routes = [
  {path: 'quiz', component: QuizComponent, data: { title: "Quiz" }},
  {path: '', component: WelcomeComponent, data: {title: "Welcome"}}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
