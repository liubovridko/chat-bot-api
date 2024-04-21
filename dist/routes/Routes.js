"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const BusinessController_1 = require("../controller/BusinessController");
const UserController_1 = require("../controller/UserController");
const HotelController_1 = require("../controller/HotelController");
const SearchController_1 = require("../controller/SearchController");
exports.Routes = [{
        method: "get",
        route: "/users",
        controller: UserController_1.UserController,
        action: "all"
    }, {
        method: "get",
        route: "/users/:id",
        controller: UserController_1.UserController,
        action: "one"
    }, {
        method: "post",
        route: "/users",
        controller: UserController_1.UserController,
        action: "save"
    }, {
        method: "delete",
        route: "/users/:id",
        controller: UserController_1.UserController,
        action: "remove"
    }, {
        method: "post",
        route: "/parse-business",
        controller: BusinessController_1.BusinessController,
        action: "parseBusiness"
    }, {
        method: "get",
        route: "/business",
        controller: BusinessController_1.BusinessController,
        action: "getAll"
    }, {
        method: "get",
        route: "/business/:id",
        controller: BusinessController_1.BusinessController,
        action: "getOne"
    }, {
        method: "get",
        route: "/search",
        controller: SearchController_1.SearchController,
        action: "searchByKeywords"
    }, {
        method: "post",
        route: "/business",
        controller: BusinessController_1.BusinessController,
        action: "create"
    }, {
        method: "put",
        route: "/business/:id",
        controller: BusinessController_1.BusinessController,
        action: "update"
    }, {
        method: "delete",
        route: "/business/:id",
        controller: BusinessController_1.BusinessController,
        action: "remove"
    }, {
        method: "get",
        route: "/admin/business",
        controller: BusinessController_1.BusinessController,
        action: "getAllAdmin"
    }, {
        method: "get",
        route: "/hotel",
        controller: HotelController_1.HotelController,
        action: "all"
    },];
//# sourceMappingURL=Routes.js.map