import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import {Autosize} from 'ionic2-autosize';

import { TestPage } from '../pages/test/test';

@NgModule({
  declarations: [
    TestPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  exports: [
      TestPage
  ],
  entryComponents: [
    TestPage
  ],
  providers: []
})
export class SubModule {}
