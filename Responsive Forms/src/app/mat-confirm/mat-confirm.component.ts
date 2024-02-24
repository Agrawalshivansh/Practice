import { Component, Inject, OnInit } from '@angular/core';
import {  MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-confirm',
  templateUrl: './mat-confirm.component.html',
  styleUrls: ['./mat-confirm.component.scss'],
})
export class MatConfirmComponent {
  message = '';
  message1 = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) data: { message: string },
  ) {
    this.message = data ? data.message : '';
  }

}
