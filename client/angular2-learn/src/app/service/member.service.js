"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Families = [
    { id: 1, name: 'Pengyy', address: 'Beijing' },
    { id: 2, name: 'YuerBaby', address: 'Beijing' },
    { id: 3, name: 'Mama', address: 'Zhengzhou' },
    { id: 4, name: 'Xinxin', address: 'Chongqing' },
];
var MemberSerivce = (function () {
    function MemberSerivce() {
    }
    MemberSerivce.prototype.getFamilyMembers = function () {
        return Promise.resolve(Families);
    };
    ;
    MemberSerivce.prototype.getFamilyMembersSlowly = function () {
        var _this = this;
        return new Promise(function (resolve) { return setTimeout(resolve, 2000); }).then(function () { return _this.getFamilyMembers(); });
    };
    ;
    MemberSerivce.prototype.getMemberInfoByID = function (id) {
        return this.getFamilyMembers().then(function (members) { return members.find(function (member) { return member.id === id; }); });
    };
    return MemberSerivce;
}());
MemberSerivce = __decorate([
    core_1.Injectable()
], MemberSerivce);
exports.MemberSerivce = MemberSerivce;
//# sourceMappingURL=member.service.js.map