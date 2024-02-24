import { MatSnackBar } from '@angular/material/snack-bar';
import { Component,ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TestService } from '../services/test.service';
import { MatConfirmComponent } from '../mat-confirm/mat-confirm.component';
import { MatDialog} from '@angular/material/dialog';
import { post } from './post.modal';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  registrationform!: FormGroup;
  posts: any;
  submitted = false;
  editMode:boolean = false
  editUserId:any
  dataSource: any;
  currentUser:any
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  displayedColumns = ['position','name', 'lastname', 'email','location', 'action'];

  constructor(public ServiceUser: TestService, private http: HttpClient, private router:Router,
    private dialog: MatDialog, private snackBar: MatSnackBar, private authService:AuthService) {
    this.posts=[]

  }
  ngOnInit(): void {
    
    this.registrationform = new FormGroup({
      name: new FormControl(this.posts.name, [
        Validators.pattern("^[a-zA-Z -']+"),
        Validators.required]),
      lastname: new FormControl(this.posts.lastname, [
        Validators.required,
        Validators.pattern("^[a-zA-Z -']+")]),

      location: new FormControl(this.posts.location, [
        Validators.required,
        Validators.pattern("^[a-zA-Z -']+")]),

      email: new FormControl(this.posts.email, [
        Validators.required,
        Validators.pattern(
          /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        )]),
    });
    this.currentUser = localStorage.getItem('email')
    this.getuser()
    }

  get name() {
    return this.registrationform.get('name');
  }

  get lastname() {
    return this.registrationform.get('lastname');
  }

  get email() {
    return this.registrationform.get('email');
  }

  get location() {
    return this.registrationform.get('location');
  }
  
  openEdit(duration) {
    this.snackBar.open('The details are updated successfully!','', {
      verticalPosition: 'top',
      duration: 2000,
    });
  }

  openSubmit(duration) {
    this.snackBar.open('The details are submitted successfully!','', {
      verticalPosition: 'top',
      duration: 2000,
    })
  }

  openDelete(duration) {
    this.snackBar.open('The details are deleted successfully!','', {
      verticalPosition: 'top',
      duration: 2000,
    });
  }
  
  getuser(){
    this.ServiceUser.fetchpost().subscribe({
      next: (response: post[])=>{
        this.posts = response
        this.dataSource = new MatTableDataSource<post>(this.posts)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
      }
    })
  }

  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }

submit():void{
    if (this.registrationform.invalid) {
      for (const control of Object.keys(this.registrationform.controls)) {
        this.registrationform.controls[control].markAsTouched();
      }
      return;
    }
  if (this.editMode) {
    this.ServiceUser.updateuser(this.editUserId.key,this.registrationform.value).
    subscribe({
      next:(response:any)=>{
        this.getuser();
        this.openEdit(2000);
        this.resetForm()
      }
    })
  } 
  else {
    const postdata = this.registrationform.value;
    this.ServiceUser.saveuser(postdata).subscribe({
      next: (response:any)=>{
        this.getuser()
        this.openSubmit(2000);
        this.resetForm()
      } 

    });
    this.posts.push(this.registrationform.value);
  }
}
deleteuser(item){
  const dialogref = this.dialog.open(
    MatConfirmComponent,
    {
      width: '500px',
      height: '150px',
      data: {
        message: 'Are you sure to delete this user?',
      },
    }
  );
  dialogref.afterClosed().subscribe(result=>{
    if(result === true){
      this.ServiceUser.deleteUser(item.key).subscribe({
        next: (response:any)=>{
          this.getuser();
          this.openDelete(2000);
        }
      })
    }
  })
}

updateuser(item:any) {
  const ref = this.dialog.open(
    MatConfirmComponent,
    {
      width: '500px',
      height: '150px',
      data: {
        message: 'Are you sure to edit this user?',
      },
    }
  );
  ref.afterClosed().subscribe(result=>{
    if(result === true){
      this.editMode = true;
  this.editUserId = item;
  this.registrationform.get('name').setValue(this.editUserId.name)
  this.registrationform.get('lastname').setValue(this.editUserId.lastname)
  this.registrationform.get('email').setValue(this.editUserId.email)
  this.registrationform.get('location').setValue(this.editUserId.location)

}
  })
}

deleteall(event:Event){
  const ref = this.dialog.open(
    MatConfirmComponent,
    {
      width: '500px',
      height: '150px',
      data: {
        message: 'Are you sure to delete all the users?',
      },
      backdropClass: 'confirmDialogComponent',
    }
  );
  ref.afterClosed().subscribe(result=>{
    if(result === true){
      this.ServiceUser.clearall().subscribe()
    }
  })
}
  resetForm() {
    this.submitted = false;
    this.registrationform.reset();
    Object.keys(this.registrationform.controls).forEach((key) => {
      const control = this.registrationform.controls[key];
      control.setErrors(null);
  });
  }

  logout(){
    this.router.navigate(['/login'])
   } 
}