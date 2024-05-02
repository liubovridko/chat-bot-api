"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const AuthController_1 = require("../controller/AuthController");
const authenticateToken_1 = require("../middleware/authenticateToken");
exports.AuthRoutes = [{
        method: "get",
        route: "/users",
        controller: AuthController_1.AuthController,
        middleware: authenticateToken_1.authenticateToken,
        action: "all"
    }, {
        method: "get",
        route: "/auth/me",
        controller: AuthController_1.AuthController,
        middleware: authenticateToken_1.authenticateToken,
        action: "authMe"
    }, {
        method: "post",
        route: "/auth/login",
        controller: AuthController_1.AuthController,
        action: "login"
    }, {
        method: "post",
        route: "/auth/register",
        controller: AuthController_1.AuthController,
        action: "register"
    }, {
        method: "delete",
        route: "/users/:id",
        controller: AuthController_1.AuthController,
        middleware: authenticateToken_1.authenticateToken,
        action: "remove"
    }];
//# sourceMappingURL=AuthRoutes.js.map