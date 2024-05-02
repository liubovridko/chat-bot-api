"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelRoutes = void 0;
const HotelController_1 = require("../controller/HotelController");
exports.HotelRoutes = [{
        method: "get",
        route: "/hotel/:id",
        controller: HotelController_1.HotelController,
        action: "one"
    }, {
        method: "get",
        route: "/hotels",
        controller: HotelController_1.HotelController,
        action: "all"
    }];
//# sourceMappingURL=HotelRoutes.js.map