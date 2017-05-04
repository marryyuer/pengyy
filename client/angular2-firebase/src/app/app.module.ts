import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { MemberDetailComponent } from './member-detail.conponent';
import { MemberSearchComponent } from './member-search.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@NgModule({
  declarations: [
    AppComponent,
    MemberDetailComponent,
    MemberSearchComponent
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
    AngularFireDatabaseModule,
    FileUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
