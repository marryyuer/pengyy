"use strict";
var http_1 = require("@angular/http");
var member_service_1 = require("./member.service");
var memberServiceFactory = function (http, userService) {
    // return new MemberSerivce(http, userService.isAuthorized);
};
exports.memberServiceProvider = {
    provider: member_service_1.MemberSerivce,
    useFactory: memberServiceFactory,
    deps: [http_1.Http, member_service_1.MemberSerivce]
};
//# sourceMappingURL=member.service.provider.js.map