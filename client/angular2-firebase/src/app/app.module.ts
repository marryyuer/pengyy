import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { MaterialModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';

import { FileUploadModule } from 'ng2-file-upload';
import { NguiMapModule } from '@ngui/map';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { MemberSearchComponent } from './member-search/member-search.component';

import { AuthGuard } from './service/auth-guard.service';
import { AuthService } from './service/auth.service';
import { TitleService } from './service/title.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from './authentication';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './error/error.component';
import { OverviewComponent } from './overview/overview.component';
import { MemberInfoComponent } from './member-info/member-info.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberSearchComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    PasswordResetComponent,
    AboutComponent,
    ErrorComponent,
    OverviewComponent,
    MemberInfoComponent,
    MemberDetailComponent,
    DialogConfirmComponent,
    MapComponent
  ],
  entryComponents: [
    MemberDetailComponent,
    DialogConfirmComponent,
    MemberInfoComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpModule,
    NguiMapModule.forRoot({
      apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyDlXwl2JmBIyPpY0ON3ciWvJj7gFP0Sd-E&libraries=visualization,places,drawing'
    }),
    MaterialModule,
    MdDatepickerModule,
    MdNativeDateModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FileUploadModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    TitleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
