"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeywordsRoutes = void 0;
const SearchController_1 = require("../controller/SearchController");
exports.KeywordsRoutes = [{
        method: "get",
        route: "/search",
        controller: SearchController_1.SearchController,
        action: "searchByKeywords"
    }, {
        method: "get",
        route: "/keywords",
        controller: SearchController_1.SearchController,
        action: "getAll"
    }, {
        method: "get",
        route: "/keywords/statistics",
        controller: SearchController_1.SearchController,
        action: "getSearchQueryStatistic"
    }];
//# sourceMappingURL=KeywordsRoutes.js.map