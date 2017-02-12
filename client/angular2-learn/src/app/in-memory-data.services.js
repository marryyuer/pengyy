"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var families = [
            { id: 1, name: 'Pengyy', address: 'Beijing' },
            { id: 2, name: 'YuerBaby', address: 'Beijing' },
            { id: 3, name: 'Mama', address: 'Zhengzhou' },
            { id: 4, name: 'Xinxin', address: 'Chongqing' }
        ];
        return { families: families };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.services.js.map