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
var router_1 = require("@angular/router");
var member_service_1 = require("./service/member.service");
// import { memberServiceProvider } from './service/member.service.provider';
var FamilyMemberComponent = (function () {
    function FamilyMemberComponent(memberService, router) {
        this.memberService = memberService;
        this.router = router;
        this.title = 'Families of Peng';
    }
    FamilyMemberComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getMemberInfo();
        setTimeout(function (router) {
            _this.router.navigate(['new-member']);
        }, 5000);
    };
    FamilyMemberComponent.prototype.getMemberInfo = function () {
        var _this = this;
        this.memberService.getFamilyMembers().then(function (members) { return _this.families = members; });
    };
    FamilyMemberComponent.prototype.onSelect = function (member) {
        this.selectedMember = member;
    };
    FamilyMemberComponent.prototype.doAdd = function (name) {
        var _this = this;
        name = name.trim();
        if (!name) {
            return;
        }
        this.memberService.addFamilyMember(name).then(function (member) {
            _this.families.push(member);
            _this.selectedMember = null;
        });
    };
    FamilyMemberComponent.prototype.doDelete = function (delMember) {
        var _this = this;
        this.memberService.deleteFamilyMember(delMember).then(function () {
            _this.families = _this.families.filter(function (member) { return member !== delMember; });
            if (_this.selectedMember === delMember) {
                _this.selectedMember = null;
            }
            ;
        });
    };
    FamilyMemberComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/member-detail', this.selectedMember.id]);
    };
    FamilyMemberComponent.prototype.test = function (e) {
    };
    return FamilyMemberComponent;
}());
FamilyMemberComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'family-member',
        templateUrl: 'member.component.html',
        styleUrls: ['member.component.css']
    }),
    __metadata("design:paramtypes", [member_service_1.MemberSerivce,
        router_1.Router])
], FamilyMemberComponent);
exports.FamilyMemberComponent = FamilyMemberComponent;
//# sourceMappingURL=member.component.js.map