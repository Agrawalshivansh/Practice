import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TestService } from '../services/test.service';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  register!: FormGroup;
  user:any
  editUserId:any
  editMode = false
  submitted:false
  constructor(private router: Router, private http:HttpClient,public service:TestService, 
    private authService:AuthService,private route:ActivatedRoute,private snackBar: MatSnackBar,
    ) {
    this.user = [];
  }

  ngOnInit(): void {
      this.register = new FormGroup({
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
    return this.register.get('email')!;
  }

  get password() {
    return this.register.get('password');
  }

  public Register(): void {
    if (this.register.invalid) {
      for (const control of Object.keys(this.register.controls)) {
        this.register.controls[control].markAsTouched();
      }
      return;
    }
    this.authService.signupUser(this.register.value)
      .then((result:any)=>{
        if(result){
        }
      })
     
this.register.reset()
}

reset() {
  this.submitted = false;
  this.register.reset();
  Object.keys(this.register.controls).forEach((key) => {
    const control = this.register.controls[key];
    control.setErrors(null);
});
}

}
