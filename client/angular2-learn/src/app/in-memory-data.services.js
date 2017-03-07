"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var families = [
            { id: 1, name: 'Pengyy', address: 'Beijing', age: 29 },
            { id: 2, name: 'YuerBaby', address: 'Beijing', age: 24 },
            { id: 3, name: 'Mama', address: 'Zhengzhou', age: 52 },
            { id: 4, name: 'Xinxin', address: 'Chongqing', age: 27 }
        ];
        return { families: families };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.services.js.map