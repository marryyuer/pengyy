import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let families = [
            {id: 1, name: 'Pengyy', address: 'Beijing'},
            {id: 2, name: 'YuerBaby', address: 'Beijing'},
            {id: 3, name: 'Mama', address: 'Zhengzhou'},
            {id: 4, name: 'Xinxin', address: 'Chongqing'}
        ];

        return {families};
    }
}