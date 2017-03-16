import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <div class="row">
    <div class="medium-8 medium-offset-2 columns">
      <h2 class="subheader"></h2>
      <ul>
        <li *ngFor="let item of collection | paginate: { itemsPerPage: 10, currentPage: p }">{{ item }}</li>
      </ul>

      <pagination-controls (pageChange)="p = $event" #api></pagination-controls>
    </div>
  </div>`,
  providers: []
})
export class AppComponent { 
  collection = [];

  constructor() {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }
}