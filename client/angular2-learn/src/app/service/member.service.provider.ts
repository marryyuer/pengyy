import { UserService } from './user.service';
import { Http } from '@angular/http';
import { MemberSerivce } from './member.service';

let memberServiceFactory = (http: Http, userService: UserService) => {
    // return new MemberSerivce(http, userService.isAuthorized);
};

export let memberServiceProvider = {
    provider: MemberSerivce,
    useFactory: memberServiceFactory,
    deps: [Http, MemberSerivce]
};
