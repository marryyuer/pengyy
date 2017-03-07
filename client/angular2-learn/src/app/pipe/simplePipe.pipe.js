"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var AgePipe = (function () {
    function AgePipe() {
    }
    AgePipe.prototype.transform = function (inputArr, minAge, maxAge) {
        if (!inputArr) {
            return inputArr;
        }
        return inputArr.filter(function (item) {
            return item.age >= +minAge && item.age <= +maxAge;
        });
    };
    return AgePipe;
}());
AgePipe = __decorate([
    core_1.Pipe({
        name: 'AgePipe'
    })
], AgePipe);
exports.AgePipe = AgePipe;
//# sourceMappingURL=simplePipe.pipe.js.map