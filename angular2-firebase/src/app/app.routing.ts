import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SampleComponent } from './sample.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'sample',
        pathMatch: 'full'
    },
    {
        path: 'sample',
        component: SampleComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
