"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const BusinessController_1 = require("../controller/BusinessController");
const AuthController_1 = require("../controller/AuthController");
const HotelController_1 = require("../controller/HotelController");
const SearchController_1 = require("../controller/SearchController");
const CategoryController_1 = require("../controller/CategoryController");
const authenticateToken_1 = require("../middleware/authenticateToken");
const FileController_1 = require("../controller/FileController");
const uploadFile_1 = require("../middleware/uploadFile");
exports.Routes = [{
        method: "get",
        route: "/users",
        controller: AuthController_1.AuthController,
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
        route: "/upload",
        controller: FileController_1.fileController,
        middleware: [authenticateToken_1.authenticateToken, uploadFile_1.upload],
        action: "uploadImage"
    }, {
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
    }, {
        method: "get",
        route: "/hotel",
        controller: HotelController_1.HotelController,
        action: "one"
    }, {
        method: "get",
        route: "/hotels",
        controller: HotelController_1.HotelController,
        action: "all"
    }, {
        method: "get",
        route: "/categories",
        controller: CategoryController_1.CategoryController,
        action: "all"
    },];
//# sourceMappingURL=Routes.js.map