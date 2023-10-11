import {Component, OnInit} from '@angular/core';
import {LocationStrategy} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {QuestionsService} from "../../../services/questions.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qid:any;
  questions:any;
  marksGot:any = 0;
  correctAnswer:any= 0;
  attempted:any= 0;
  isSubmit=false;
  timer:any;


  constructor(private locationSt: LocationStrategy, private _route: ActivatedRoute, private _question: QuestionsService) {
  }

  ngOnInit() {
    this.preventBackButton();
    this.qid = this._route.snapshot.params["qid"];
    console.log(this.qid);
    this.loadQuestions();
  }

  loadQuestions() {
    this._question.getQuestionsForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;
        this.timer=this.questions.length*2*60;
        this.questions.forEach((q:any) => {
          q['givenAnswer'] = '';
        });
        console.log(this.questions);
        this.startTimer();
      },
      (error) => {
        console.log(error);
        Swal.fire("Error", "Error in loading questions of quiz", "error");
      }
    );
  }

  preventBackButton() {
    history.pushState(null, null!, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null!, location.href);
    });
  }

  submitQuiz(): any {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info',
      // denyButtonText: `Don't save`,
    }).then((e) => {
      /* Read more about isConfirmed, isDenied below */
      if (e.isConfirmed) {
        //     Swal.fire('Submitted successfully!!!', '', 'success')
        //     this.isSubmit=true;
        //  this.questions.forEach((q:any):any=>{
        //    if(q.givenAnswer==q.answer){
        //      this.correctAnswer++;
        //      let marksSingle:any=
        //        this.questions[0].quiz.maxMarks / this.questions.length;
        //      this.marksGot +=marksSingle;
        //    }
        //   if(q.givenAnswer.trim()!= ""){
        //     this.attempted++;
        //   }
        //
        //  });
        //  console.log('Correct Answers : '+ this.correctAnswer);
        //  console.log('Marks Got is :' + this.marksGot);
        //  console.log("Total questions attempted is : " + this.attempted);
        this.evalvQuiz();
      }
    });

  }
  evalvQuiz(): any {
    // Swal.fire({
    //   confirmButtonText: 'Submit',
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire('Submitted successfully!!', '', 'success');
    //     this.isSubmit=true;
    //   }
    // })
        Swal.fire('Submitted successfully!!!', '', 'success')
        this.isSubmit=true;
        this.questions.forEach((q:any):any=>{
          if(q.givenAnswer==q.answer){
            this.correctAnswer++;
            let marksSingle:any=
              this.questions[0].quiz.maxMarks / this.questions.length;
            this.marksGot +=marksSingle;
          }
          if(q.givenAnswer.trim()!= ""){
            this.attempted++;
          }

        });
        console.log('Correct Answers : '+ this.correctAnswer);
        console.log('Marks Got is :' + this.marksGot);
        console.log("Total questions attempted is : " + this.attempted);
      }
//     });
// }
  startTimer(){
    let t:any =window.setInterval(()=>{
      if(this.timer<=0){
        this.evalvQuiz();
        clearInterval(t);
      }
      else{
        this.timer--;
      }
    },1000);
  }
  getFormattedTime(){
    let min=Math.floor(this.timer/60);
    let sec=(this.timer-min*60);
    return `${min} min : ${sec} sec`
  }
printResult(){
    window.print();
}

}

