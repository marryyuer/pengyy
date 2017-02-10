import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FamilyMemberComponent} from './member.component';
import { MemberDetailComponent } from './member-detail.component';
import { DashboardComponent } from './dashboard.component';
import { MemberSerivce } from './service/member.service';

@NgModule({
    id: 'AppComponent',
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'family-member',
                component: FamilyMemberComponent
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'member-detail/:id',
                component: MemberDetailComponent
            }
        ])
    ],
    declarations: [AppComponent, FamilyMemberComponent, MemberDetailComponent, DashboardComponent],
    bootstrap: [AppComponent],
    providers: [MemberSerivce]
})
export class AppModule {

}
