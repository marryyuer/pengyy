import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { MemberDetailComponent } from './member-detail.conponent';

import { AngularFireModule } from 'angularfire2';

@NgModule({
  declarations: [
    AppComponent,
    MemberDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyC0UmUecYAsYo2jisajeTjhBpcgSZZnRfA',
      authDomain: 'pyyproject118711.firebaseapp.com',
      databaseURL: 'https://pyyproject118711.firebaseio.com',
      storageBucket: 'pyyproject118711.appspot.com',
      messagingSenderId: '641823626837'
    }),
    FileUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
