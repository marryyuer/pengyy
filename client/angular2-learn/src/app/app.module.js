"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
// import { RouterModule } from '@angular/router';
var app_routing_module_1 = require("./app-routing.module");
var angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
var in_memory_data_services_1 = require("./in-memory-data.services");
require("./rxjs-extensions");
var app_component_1 = require("./app.component");
var member_component_1 = require("./member.component");
var member_detail_component_1 = require("./member-detail.component");
var dashboard_component_1 = require("./dashboard.component");
var member_search_component_1 = require("./member-search.component");
var new_member_component_1 = require("./new-member.component");
var member_service_1 = require("./service/member.service");
var simplePipe_pipe_1 = require("./pipe/simplePipe.pipe");
var file_upload_component_1 = require("./file-upload.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        id: 'AppComponent',
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            angular_in_memory_web_api_1.InMemoryWebApiModule.forRoot(in_memory_data_services_1.InMemoryDataService),
            app_routing_module_1.AppRoutingModule
        ],
        declarations: [
            app_component_1.AppComponent,
            member_component_1.FamilyMemberComponent,
            member_detail_component_1.MemberDetailComponent,
            dashboard_component_1.DashboardComponent,
            member_search_component_1.MemberSearchComponent,
            new_member_component_1.NewMemberComponent,
            file_upload_component_1.FileUploadComponent,
            simplePipe_pipe_1.AgePipe
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [member_service_1.MemberService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map