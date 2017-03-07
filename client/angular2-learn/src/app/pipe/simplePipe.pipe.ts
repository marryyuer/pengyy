import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'AgePipe'
})
export class AgePipe implements PipeTransform {
    transform(inputArr: any, minAge: string, maxAge: string) {
        if (!inputArr) { return inputArr; }

        return inputArr.filter((item: any) => {
            return item.age >= +minAge && item.age <= +maxAge;
        });
    }
}