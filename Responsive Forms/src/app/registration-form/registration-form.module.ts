import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule} from './../shared/shared.module';
import { RegistrationFormComponent } from './registration-form.component';

const routes: Routes = [
{
path:'',
component:RegistrationFormComponent,   
}
];
@NgModule({
declarations: [RegistrationFormComponent],
imports: [
CommonModule,
SharedModule,
RouterModule.forChild(routes)
],
})
export class RegistrationModule { }





