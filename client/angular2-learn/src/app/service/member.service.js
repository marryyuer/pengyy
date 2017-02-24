"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var MemberSerivce = (function () {
    // constructor(private http: Http,
    //             private isAuthorized: boolean) {}
    function MemberSerivce(http) {
        this.http = http;
    }
    MemberSerivce.prototype.searchMember = function (name) {
        return this.http.get('app/families?name=' + name, { headers: new http_1.Headers({ 'Content-type': 'application/json' }) })
            .map(function (res) { return res.json().data; });
        // .map((
        //     res: Response) => (res.json().data as FamilyMember[]).filter(member => this.isAuthorized || !member.isSecret)
        // );
    };
    MemberSerivce.prototype.getFamilyMembers = function () {
        return this.http.get('app/families')
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
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
    MemberSerivce.prototype.updateFamilyMember = function (member) {
        var updUrl = 'app/families/' + member.id;
        return this.http.put(updUrl, JSON.stringify(member), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) })
            .toPromise()
            .then(function () { return member; })
            .catch(this.handleError);
    };
    MemberSerivce.prototype.addFamilyMember = function (memberName) {
        return this.http.post('app/families', JSON.stringify({ name: memberName, address: 'futrue' }), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) })
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    MemberSerivce.prototype.deleteFamilyMember = function (member) {
        return this.http.delete('app/families/' + member.id, { headers: new http_1.Headers({ 'Content- Type': 'application/json' }) })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    MemberSerivce.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return MemberSerivce;
}());
MemberSerivce = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], MemberSerivce);
exports.MemberSerivce = MemberSerivce;
//# sourceMappingURL=member.service.js.map