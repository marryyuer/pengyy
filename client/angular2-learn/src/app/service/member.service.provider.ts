import { UserService } from './user.service';
import { Http } from '@angular/http';
import { MemberService } from './member.service';

let memberServiceFactory = (http: Http, userService: UserService) => {
    // return new MemberSerivce(http, userService.isAuthorized);
};

export let memberServiceProvider = {
    provider: MemberService,
    useFactory: memberServiceFactory,
    deps: [Http, MemberService]
};
