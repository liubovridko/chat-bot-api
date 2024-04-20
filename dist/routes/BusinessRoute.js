"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
var BusinessController_1 = require("../controller/BusinessController");
exports.Routes = [{
        method: "get",
        route: "/",
        controller: BusinessController_1.BusinessController,
        action: "all"
    }, {
        method: "get",
        route: "/:id",
        controller: BusinessController_1.BusinessController,
        action: "one"
    }, {
        method: "post",
        route: "/",
        controller: BusinessController_1.BusinessController,
        action: "saveBusinessesFromJson"
    }, {
        method: "delete",
        route: "/:id",
        controller: BusinessController_1.BusinessController,
        action: "remove"
    }];
//# sourceMappingURL=BusinessRoute.js.map