import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private snack: MatSnackBar, private login: LoginService,private router:Router) {
  }

  loginData = {
    username: '',
    password: '',
  }

  ngOnInit() {
  }

  formSubmit() {
    console.log("Login button clicked");
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open("Username is required !!", "", {
        duration: 3000
      });
      return;

    }
    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open("Password is required !!", "", {
        duration: 3000
      });
      return;
    }

    //   request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        //success
        console.log('success');
        console.log(data);

        //login..
this.login.loginUser(data.token);
this.login.getCurrentUser().subscribe(
  (user:any)=>{
    this.login.setUser(user);
    console.log(user);
  //   REDIRECT ...ADMIN ::ADMIN DASHBOARD
    //REDIRECT ...NORMAL::USER-DASBOARD
    if(this.login.getUserRole()=="ADMIN"){
      this.router.navigate(['admin']);
      this.login.loginStatusSubject.next(true);
      // window.location.href= '/admin';
      //ADMIN DASHBOARD
    }else if(this.login.getUserRole()=="NORMAL") {
      this.router.navigate(['user-dashboard/0']);
      this.login.loginStatusSubject.next(true);

      // window.location.href='/user-dashboard';
      //normal user dashboard
    }else {
this.login.logout();
    }
  }

);


      },
      (error) => {
        console.log('Error !');
        console.log(error);
        this.snack.open("Invalid details.Try again!!","",{
          duration:3000,
        })
      }
    );
  }

}






