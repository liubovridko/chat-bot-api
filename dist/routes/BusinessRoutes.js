"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessRoutes = void 0;
const BusinessController_1 = require("../controller/BusinessController");
const authenticateToken_1 = require("../middleware/authenticateToken");
exports.BusinessRoutes = [{
        method: "post",
        route: "/parse-business",
        controller: BusinessController_1.BusinessController,
        action: "parseBusiness"
    }, {
        method: "get",
        route: "/business",
        controller: BusinessController_1.BusinessController,
        action: "getAll"
    }, , {
        method: "get",
        route: "/admin/business",
        controller: BusinessController_1.BusinessController,
        action: "getAllAdmin"
    }, {
        method: "get",
        route: "/business/:id",
        controller: BusinessController_1.BusinessController,
        action: "getOne"
    }, {
        method: "post",
        route: "/business",
        controller: BusinessController_1.BusinessController,
        middleware: authenticateToken_1.authenticateToken,
        action: "create"
    }, {
        method: "put",
        route: "/business/:id",
        controller: BusinessController_1.BusinessController,
        middleware: authenticateToken_1.authenticateToken,
        action: "update"
    }, {
        method: "delete",
        route: "/business/:id",
        controller: BusinessController_1.BusinessController,
        action: "remove",
        middleware: authenticateToken_1.authenticateToken
    }, {
        method: "get",
        route: "/admin/business",
        controller: BusinessController_1.BusinessController,
        action: "getAllAdmin"
    }];
//# sourceMappingURL=BusinessRoutes.js.map