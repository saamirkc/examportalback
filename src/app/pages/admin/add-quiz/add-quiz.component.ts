import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import Swal from "sweetalert2";
import {MatSnackBar} from "@angular/material/snack-bar";
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})

export class AddQuizComponent implements OnInit {
  categories: any = [
// {
//   cid:25,
//   title:'Programming',
// },
    // {
    //   cid:25,
    //   title:'Programming',
    // },
  ]
  quizData: any = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid: ''
    }

  }

  constructor(private _cat: CategoryService, private _snack: MatSnackBar, private quiz: QuizService) {
  }

  ngOnInit() {
    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error!!', "Error in server", 'error');
      }
    );
  }

  //adding
  addQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this._snack.open('Title is required', '', {
        duration: 3000,
      });
      return;
    }
    //call server
    this.quiz.addQuiz(this.quizData).subscribe(
      (data) => {
        this.quizData.title = '';
        this.quizData.description = '';
        this.quizData.maxMarks = '';
        this.quizData.numberOfQuestions = '';
        this.quizData.category = '';
        Swal.fire('Success!!!', 'Successfully added', 'success');
      },
      (error) => {
        Swal.fire('Error!!!', 'Error in server', 'error');
        console.log(error);
      });


  }

}

