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
var FamilyMemberComponent = (function () {
    function FamilyMemberComponent(memberService, router) {
        this.memberService = memberService;
        this.router = router;
        this.title = 'Families of Peng';
    }
    FamilyMemberComponent.prototype.ngOnInit = function () {
        this.getMemberInfo();
    };
    FamilyMemberComponent.prototype.getMemberInfo = function () {
        var _this = this;
        this.memberService.getFamilyMembersSlowly().then(function (members) { return _this.families = members; });
    };
    FamilyMemberComponent.prototype.onSelect = function (member) {
        this.selectedMember = member;
    };
    FamilyMemberComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/member-detail', this.selectedMember.id]);
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