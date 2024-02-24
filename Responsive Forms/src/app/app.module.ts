// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AppComponent } from './app.component';
// import { AppRoutingModule } from './app-routing.module';
// import { HttpClientModule } from '@angular/common/http';
// import { environment } from 'src/environments/environment.prod';
// import { AngularFireModule } from '@angular/fire/compat';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { HeaderComponent } from './header/header.component';
// import { FooterComponent } from './footer/footer.component';
// @NgModule({
//  declarations: [AppComponent,FooterComponent, HeaderComponent],

// imports: [
// BrowserModule,
// AppRoutingModule,
// MatSnackBarModule,
// HttpClientModule,
// BrowserAnimationsModule,
// AngularFireModule.initializeApp(environment.firebase),

// ],
// providers: [],
// bootstrap: [AppComponent],
// })

// export class AppModule { }
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { AngularFireModule } from '@angular/fire/compat';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common'
import { AgmCoreModule } from '@agm/core';
@NgModule({
 declarations: [AppComponent, FooterComponent, HeaderComponent],

imports: [
BrowserModule,
MatIconModule,
MatMenuModule,
RouterModule,
CommonModule,
// Component,
MatSnackBarModule ,
MatDialogModule,
MatPaginatorModule,
MatFormFieldModule,
MatTableModule,
MatIconModule,
MatButtonModule,
MatToolbarModule,
MatSidenavModule,
ReactiveFormsModule,
AppRoutingModule,
BrowserAnimationsModule,
MatListModule,
MatSnackBarModule,
AppRoutingModule,
HttpClientModule,
BrowserAnimationsModule,
AngularFireModule.initializeApp(environment.firebase),

],
providers: [],
bootstrap: [AppComponent],
})

export class AppModule { }