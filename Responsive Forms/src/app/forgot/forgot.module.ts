import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule} from './../shared/shared.module';

import { ForgotComponent } from './forgot.component';
const routes: Routes = [
{
path:'',
component:ForgotComponent,
}
];
@NgModule({
declarations: [ForgotComponent],
imports: [
CommonModule,
SharedModule,
RouterModule.forChild(routes)
]
})

export class ForgotModule { }





