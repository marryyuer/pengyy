import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { FamilyMemberComponent } from './member.component';
import { MemberDetailComponent } from './member-detail.component';
import { NewMemberComponent } from './new-member.component';

const routes: Routes = [
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
        path: 'member-detail/:id',
        component: MemberDetailComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'new-member',
        component: NewMemberComponent
    }
];

@NgModule({
    // imports: [RouterModule.forRoot(routes, {useHash: true})],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
