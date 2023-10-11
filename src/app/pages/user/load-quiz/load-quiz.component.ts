import {Component, OnInit} from '@angular/core';
import {AppRoutingModule} from "../../../app-routing.module";
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit{
  catId:any;
  quizzes:any;

  constructor(private _route:ActivatedRoute,private _quiz:QuizService) {
  }
  ngOnInit() {

   this._route.params.subscribe((params)=>{
     this.catId=this._route.snapshot.params['catId'];
     if(this.catId==0){
       console.log("Load all quizes");
       this._quiz.getActiveQuizzes().subscribe(
         (data:any)=>{
           this.quizzes=data;
           console.log(this.quizzes);
         },
         (error)=>{
           console.log(error);
           alert("ERROR in loading data");
         } )
     }else{
       console.log("Load specific quizes");
       this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe((data:any)=>{
         this.quizzes=data;
       },
         (error)=>{
         Swal.fire('Error!!','Error in loading quizzes from category','error');
         })
     }
   })

  }

}
