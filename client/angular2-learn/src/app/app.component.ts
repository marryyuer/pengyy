import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `<h1>{{title}}</h1>
               <a routerLink="/family-member">Family Members</a>
               <a routerLink="/dashboard">Dashboard</a>
               <router-outlet></router-outlet>`
})
export class AppComponent {
    title = 'The Family of Peng';
}
