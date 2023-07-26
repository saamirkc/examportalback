import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import {CategoryService} from "../../../services/category.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{
categories:any=[]
  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _cat:CategoryService,private _router:Router) {
  }
  qid:any=0;
  quiz:any;
ngOnInit() {
 this.qid= this._route.snapshot.params['qid'];
 // alert(this.qid);
  this._quiz.getQuiz(this.qid).subscribe(
    (data:any)=>{
      this.quiz=data;
      console.log(this.quiz);
    },

    (error)=>{
      console.log(error);
    } );
this._cat.categories().subscribe(
  (data:any)=>{
    this.categories=data;

  },

  (error)=>{
    console.log(error);
  });
}
//updating quiz
  updateQuiz(){
  this._quiz.updateQuiz(this.quiz).subscribe(
    (data:any)=>{
      Swal.fire('Success!!','Quiz updated successfully!!','success').then((e)=>{
        this._router.navigate(['/admin/view-quizzes'])
      });
    },
    (error)=>{
      Swal.fire('Error!!','Error in server','error');
    } );
  }
}
