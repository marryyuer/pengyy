import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Ng2PaginationModule } from 'ng2-pagination';

import { AppComponent }   from './app.component';

@NgModule({
  imports:      [ 
    BrowserModule,
    Ng2PaginationModule
  ],
  declarations: [ 
    AppComponent
  ],
  providers:[ ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}