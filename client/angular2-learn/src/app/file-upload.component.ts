import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'file-upload',
    template: '<input type="file" #fileInput>'
})
export class FileUploadComponent {
    @Input() multiple: boolean = false;
    @ViewChild('fileInput') inputEl: ElementRef;

    constructor(private http: Http) {}

    upload() {
        let inputEl: HTMLInputElement = this.inputEl.nativeElement;
        let fileCount: number = inputEl.files.length;
        let formData = new FormData();
        if (fileCount > 0) { // a file was selected
            for (let i = 0; i < fileCount; i++) {
                formData.append('file', inputEl.files.item(i));
            }

            this.http
                .post('http://your.upload.url', formData);
            // subscribe to observable to listen for response
        }
    }
}