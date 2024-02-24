import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { AuthGuard } from './services/auth.guard';
// import { HomeComponent } from './home/home.component';
const routes:Routes=[
{    path: 'login',
    loadChildren: () => import('./login-form/login-form.module').then(m => m.LoginModule)},

{
    path: 'register',
loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
},


{
    path:'admin',
    loadChildren:() => import('./registration-form/registration-form.module').then(m=>m.RegistrationModule), canActivate: [AuthGuard],

},
{
    path:'forgot',
    loadChildren:() => import('./forgot/forgot.module').then(m=>m.ForgotModule),
},

{
    path:'',
    redirectTo:'login',
    pathMatch:'full'
}

];

@NgModule({
imports:[
 RouterModule.forRoot(routes)
],
exports:[
 RouterModule
]})

export class AppRoutingModule{
}