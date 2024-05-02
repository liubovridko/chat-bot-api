"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const CategoryController_1 = require("../controller/CategoryController");
exports.CategoryRoutes = [{
        method: "get",
        route: "/categories",
        controller: CategoryController_1.CategoryController,
        action: "all"
    }];
//# sourceMappingURL=CategoryRoutes.js.map