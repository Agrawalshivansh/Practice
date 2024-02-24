import { AuthService } from './../services/auth.service';
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TestService } from '../services/test.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ForgotComponent } from '../forgot/forgot.component';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginform!: FormGroup;
  user:any
  submitted:false
  constructor(private router: Router, private http:HttpClient,public service:TestService, 
    private authService:AuthService,private route:ActivatedRoute,private snackBar: MatSnackBar,
    private dialog: MatDialog
    ) {this.user = []; }

  ngOnInit(): void {
      this.loginform = new FormGroup({
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
        Validators.pattern(
          /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        ),
      ]),
    });
  }

  get email() {
    return this.loginform.get('email')!;
  }

  get password() {
    return this.loginform.get('password');
  }

  public signin(): void {
    if (this.loginform.invalid) {
      for (const control of Object.keys(this.loginform.controls)) {
        this.loginform.controls[control].markAsTouched();
      }
      return;
    }

    this.authService.loginUser(this.loginform.value.email, this.loginform.value.password)
    .then((result:any)=>{
      if(result){
        this.router.navigate(['./admin'])
      }
    })
    localStorage.setItem('email',this.email.value)
    this.loginform.reset()
}

SigninWithGoogle(){
  this.authService.SigininWithgoogle()
  this.loginform.reset()
}

forgotpassword(){
  const dialogref = this.dialog.open(
    ForgotComponent,
    {
      width: '50%',
      height: '60%',
    }
  );
  
}

reset() {
  this.submitted = false;
  this.loginform.reset();
  Object.keys(this.loginform.controls).forEach((key) => {
    const control = this.loginform.controls[key];
    control.setErrors(null);
});
}

}


