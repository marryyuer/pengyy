import { BrowserModule, Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

@Injectable()
export class TitleService {
    constructor(private title: Title) {}

    changeTitle(title: string) {
        this.title.setTitle(title);
    }
}
