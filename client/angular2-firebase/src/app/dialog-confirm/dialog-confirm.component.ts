import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css']
})
export class DialogConfirmComponent {

  constructor(@Inject(MD_DIALOG_DATA) public data: any) { }

}
