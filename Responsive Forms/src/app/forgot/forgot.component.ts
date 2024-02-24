import { Component } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent {
  register!: FormGroup;
  submitted:false
  email : string = '';
  constructor(private authService:AuthService) {}

  ngOnInit(): void {
  }

forgotPassword() {
  this.authService.forgotPassword(this.email);
  this.email = '';
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
