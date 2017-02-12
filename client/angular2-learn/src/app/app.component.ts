import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: `<h1>{{title}}</h1>
               <nav>
                   <a routerLink="/family-member" routerLinkActive="active">Family Members</a>
                   <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
               </nav>
               <router-outlet></router-outlet>`,
    styleUrls: ['app.component.css']
})
export class AppComponent {
    title = 'The Family of Peng';
}
