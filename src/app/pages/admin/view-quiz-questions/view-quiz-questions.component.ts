import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuestionsService} from "../../../services/questions.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit{
  qid:any;
  title:any;
  questions:any=[];
constructor(private _route:ActivatedRoute,private _question:QuestionsService) {

}
ngOnInit() {
 this.qid= this._route.snapshot.params['qid'];
 this.title= this._route.snapshot.params['title'];
  console.log(this.qid);
  console.log(this.title);
  this._question.getQuestions(this.qid).subscribe(
    (data)=>{
      this.questions=data;
      console.log(data);

    },
    (error)=>{
      console.log(error);
    } )

}
//deleting question
  deleteQuestion(quesId:any){
    Swal.fire({
      icon:"info",
      title:"Are you sure?",
      confirmButtonText:"Delete",
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        this._question.deleteQuestion(quesId).subscribe(
          (data)=>{
            this.questions= this.questions.filter((question:any)=>question.quesId!=quesId);
            Swal.fire('Success!!','Quiz deleted','success');
          },
          (error)=>{
            Swal.fire('Error!!','Error in deleting quiz','error');
          }  );
      }
    })

  }
  }

