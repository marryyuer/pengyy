import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.services';

import './rxjs-extensions';

import { AppComponent } from './app.component';
import { FamilyMemberComponent} from './member.component';
import { MemberDetailComponent } from './member-detail.component';
import { DashboardComponent } from './dashboard.component';
import { MemberSearchComponent } from './member-search.component';
import { NewMemberComponent } from './new-member.component';
import { MemberService } from './service/member.service';

import { AgePipe } from './pipe/simplePipe.pipe';

import { FileUploadComponent } from './file-upload.component';

@NgModule({
    id: 'AppComponent',
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        FamilyMemberComponent,
        MemberDetailComponent,
        DashboardComponent,
        MemberSearchComponent,
        NewMemberComponent,
        FileUploadComponent,
        AgePipe
    ],
    bootstrap: [AppComponent],
    providers: [MemberService]
})
export class AppModule {

}
