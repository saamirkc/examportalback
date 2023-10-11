import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit{
  qid:any;
  quiz:any;
  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _router:Router) {
  }
ngOnInit() {
    this.qid=this._route.snapshot.params["qid"];
    console.log(this.qid);
    this._quiz.getQuiz(this.qid).subscribe(
      (data:any)=>{
        console.log(data);
        this.quiz=data;
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error!!','Error in  loading quiz','error');
      }  )
}
startQuiz():any{
  Swal.fire({
    title: 'Do you want to start the quiz?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Start',
    denyButtonText: `Don't start`,
    icon:'info'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire('Started!', '', 'success')
this._router.navigate(['/start/'+this.qid])
    } else if (result.isDenied) {
      Swal.fire('Not yet started', '', 'info')
    }
  })
  }
}
