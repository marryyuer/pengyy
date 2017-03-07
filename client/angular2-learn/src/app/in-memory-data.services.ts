import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let families = [
            {id: 1, name: 'Pengyy', address: 'Beijing', age: 29},
            {id: 2, name: 'YuerBaby', address: 'Beijing', age: 24},
            {id: 3, name: 'Mama', address: 'Zhengzhou', age: 52},
            {id: 4, name: 'Xinxin', address: 'Chongqing', age: 27}
        ];

        return {families};
    }
}