import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule} from './../shared/shared.module';
import { LoginFormComponent } from './login-form.component';

const routes: Routes = [
{
path:'',
component:LoginFormComponent,
}
];
@NgModule({
declarations: [LoginFormComponent],
imports: [
CommonModule,
SharedModule,
RouterModule.forChild(routes)
]
})

export class LoginModule { }





