import { Component, OnInit, Inject } from '@angular/core';
import { QuizStructure } from '../Models/QuizStructure';
import { MatSnackBar } from '@angular/material/snack-bar';
import { bounceInLeft, bounceInRight, bounceInUp, zoomIn } from 'ng-animate';
import { trigger, transition, useAnimation } from '@angular/animations';
import { RouterLink, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResetDialogComponent } from '../reset-dialog/reset-dialog.component';
import { isNullOrUndefined } from 'util';



@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  animations: [
    trigger('zoomIn', [transition('* => *', useAnimation(zoomIn, {
      params: { timing: 1, delay: 0 }
    }))]),
    trigger('bounceInLeft', [transition('* => *', useAnimation(bounceInLeft, {
      params: { timing: 4, delay: 0 }
    }))]),
    trigger('bounceInRight', [transition('* => *', useAnimation(bounceInRight, {
      params: { timing: 4, delay: 0 }
    }))]),
    trigger('bounceInUp', [transition('* => *', useAnimation(bounceInUp, {
      params: { timing: 4, delay: 0 }
    }))])
  ],
})
export class QuizComponent {

  quizQuestionOne: QuizStructure = { QuestionNumber: 1, Question: "Which is the largest country in the world by population?", OptionOne: "India", OptionTwo: "USA", OptionThree: "China", OptionFour: "Russia", CorrectAnswer: "China" };
  quizQuestionTwo: QuizStructure = { QuestionNumber: 2, Question: "When did the second world war end?", OptionOne: "1945", OptionTwo: "1939", OptionThree: "1944", OptionFour: "1942", CorrectAnswer: "1945" };
  quizQuestionThree: QuizStructure = { QuestionNumber: 3, Question: "Which was the first country to issue paper currency?", OptionOne: "USA", OptionTwo: "France", OptionThree: "Italy", OptionFour: "China", CorrectAnswer: "China" };
  quizQuestionFour: QuizStructure = { QuestionNumber: 4, Question: "Which city hosted the 1996 Summer Olympics?", OptionOne: "Atlanta", OptionTwo: "Sydney", OptionThree: "Athens", OptionFour: "Beijing", CorrectAnswer: "Atlanta" };
  quizQuestionFive: QuizStructure = { QuestionNumber: 5, Question: "Who invented telephone?", OptionOne: "Albert Einstein", OptionTwo: "Alexander Graham Bell", OptionThree: "Isaac Newton", OptionFour: "Marie Curie", CorrectAnswer: "Alexander Graham Bell" };

  quizQuestion: QuizStructure;
  quizScore: number;
  isQuizComplete: boolean;
  btnSubmitFlag: boolean = false;
  btnNextFlag: boolean = true;
  isQuizReset: boolean = false;
  message: string
  disableOptions: boolean = false;

  selectedOption: any = null;

  constructor(private snackBar: MatSnackBar, private router: Router, public dialog: MatDialog) {

  }
  ngOnInit() {
    this.quizScore = 0;
    this.isQuizComplete = false;
    this.quizQuestion = this.quizQuestionOne;
    this.message = "Are you sure you want to restart? All your progress so far would be lost!!!"
  }

  openDialog(): void {
    if (!this.isQuizComplete) {
      const dialogRef = this.dialog.open(ResetDialogComponent, {
        width: '500px',
        data: { header:"Warning", message: this.message, isQuizReset: this.isQuizReset, showYesButton: '', showNoButton: '', showOkButton: 'hidden' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (!isNullOrUndefined(result)) {
          this.isQuizReset = result;
          this.onRestartClick(this.isQuizReset);
        }
        else {
          this.isQuizReset = false;
          this.onRestartClick(this.isQuizReset);
        }
      });
    }
    else {
      this.onRestartClick(true);
    }

  }

  onRestartClick(quizResetFlag: boolean) {
    if (quizResetFlag) {
      this.quizScore = 0;
      this.isQuizComplete = false;
      this.router.navigate(['']);
    }
  }

  resetSelections() {
    this.disableOptions = false;
    this.selectedOption = null;
    this.btnSubmitFlag = false;
    this.btnNextFlag = true;
  }


  openSnackBar(message: string, action: string, showDuration: number) {
    this.snackBar.open(message, action, {
      duration: showDuration,
    });
  }

  public onSubmitClick() {
    if (this.selectedOption != null) {
      this.disableOptions = true;
      if (this.selectedOption == this.quizQuestion.CorrectAnswer) {
        this.openSnackBar("Correct Answer!!! 🎉🎉🎊🎊", "Dismiss", 2000);
      }
      else {
        this.openSnackBar("Wrong Answer!!! 👎🏾👎🏾👎🏾", "Dismiss", 2000);
      }
      if (this.quizQuestion.QuestionNumber != 5) {
        this.btnSubmitFlag = true;
        this.btnNextFlag = false;
      }
      else {
        if (this.selectedOption == this.quizQuestion.CorrectAnswer) {
          this.quizScore += 1;
        }
        this.isQuizComplete = true;
        this.btnSubmitFlag = true;
        this.btnNextFlag = true;
        this.showScores();
      }

    }
    else {
      this.openSnackBar("Please select an option to proceed", "Dismiss", 6000);
    }


  }

  showScores() {
    this.message = "Quiz completed. Your score is " + this.quizScore + ". Click Restart Quiz button to take quiz again."
    this.dialog.open(ResetDialogComponent, {
      width: '500px',
      data: { header:"Information", message: this.message, isQuizReset: this.isQuizReset, showYesButton: 'hidden', showNoButton: 'hidden', showOkButton: ''}
    });
  }

  onNextClick() {
    if (this.selectedOption != null) {
      switch (this.quizQuestion.QuestionNumber) {
        case 1: {
          if (this.selectedOption == this.quizQuestion.CorrectAnswer) {
            this.quizScore += 1;
          }
          this.quizQuestion = this.quizQuestionTwo;
          this.resetSelections();
          break;
        }
        case 2: {
          if (this.selectedOption == this.quizQuestion.CorrectAnswer) {
            this.quizScore += 1;
          }
          this.quizQuestion = this.quizQuestionThree;
          this.resetSelections();
          break;
        }
        case 3: {
          if (this.selectedOption == this.quizQuestion.CorrectAnswer) {
            this.quizScore += 1;
          }
          this.quizQuestion = this.quizQuestionFour;
          this.resetSelections();
          break;
        }
        case 4: {
          if (this.selectedOption == this.quizQuestion.CorrectAnswer) {
            this.quizScore += 1;
          }
          this.quizQuestion = this.quizQuestionFive;
          this.resetSelections();
          break;
        }
        default: {
        }
      }


    }

  }


}
