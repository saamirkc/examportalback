import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuestionsService} from "../../../services/questions.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import Swal from "sweetalert2";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit{
  public Editor = ClassicEditor;
  qid:any;
  title:any;
  question={
    quiz:{
     qid:'',
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',

  };

  constructor(private  _route:ActivatedRoute,private _question:QuestionsService,private _snack:MatSnackBar) {
  }
  ngOnInit() {
    this.qid=this._route.snapshot.params['qid'];
    this.title=this._route.snapshot.params['title'];
    this.question.quiz.qid=this.qid;

    // console.log(this.qid);
    // this.question.quiz['qid']=this.qid;
  }
  formSubmit(){
    if(this.question.content==''||this.question.content==null){
      this._snack.open('Content is required','',{
        duration:3000
      })
      return;
    }
    this._question.addQuestion(this.question).subscribe(
      (data:any)=>{
        this.question.content='';
        this.question.option1='';
        this.question.option2='';
        this.question.option3='';
        this.question.option4='';
        Swal.fire('Success!!!','Question successfully added','success');
      },
      (error)=>{
        Swal.fire('Error!!!','Error in adding question','error');
      } )

     }

}
