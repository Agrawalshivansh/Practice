import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleAuthProvider } from "firebase/auth";
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isLoggedIn = false;
    constructor(private router: Router, private fireauth: AngularFireAuth, private snackBar:MatSnackBar) {}

    loginUser(email: string, password: string): Promise<any> {
        return this.fireauth.signInWithEmailAndPassword(email, password)
            .then((data)=>{
                this.isLoggedIn = true
                this.router.navigate(['./admin'])
            },
            err=>{
                this.openSnackbar('Invalid',2000)
            })
        
    }

    signupUser(user: any): Promise<any> {
        return this.fireauth.createUserWithEmailAndPassword(user.email, user.password).then((data)=>{
            this.openSnackbar('Success',2000)
        },
        err=>{
            this.openSnackbar('Check',2000)
        })
    }

        SigininWithgoogle(){
            return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(res=>{
                this.isLoggedIn = true
                this.router.navigate(['./admin'])
            },
            err=>{
                this.openSnackbar('Invalid',2000)
            })  
        }

        forgotPassword(email : string) {
            this.openSnackbar('Sent',2000)
         return  this.fireauth.sendPasswordResetEmail(email)

        }

        showSnackbar(message: string, label: string, duration: number) {
           this.snackBar.open(message, label, {
             verticalPosition: 'top',
             duration: 2000,
           });
         }
         openSnackbar(type: string, duration: number)
         {
          switch (type)
          {
            case 'Invalid':
             this.showSnackbar('Invalid Email-Id or Password!', 'Try Again', duration);
             break;
            case 'Success':
             this.showSnackbar('Successfully Registered!', 'Success', duration);
             break;
            case 'Check':
             this.showSnackbar('Email-Id already exists!', 'Retry', duration);
             break;
            case 'Sent':
             this.showSnackbar('Email sent to reset your password!', 'Success', duration);
             break;
             
            default:
             break;
       
         }
       
       }
}