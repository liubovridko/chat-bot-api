import { BusinessController } from "../controller/BusinessController";
import { UserController } from "../controller/UserController";
import { HotelController } from "../controller/HotelController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}, {
    method: "post",
    route: "/parse-business",
    controller: BusinessController,
    action: "parseBusiness"
}, {
    method: "get",
    route: "/business",
    controller: BusinessController,
    action: "getAll"
}, {
    method: "get",
    route: "/business/:id",
    controller: BusinessController,
    action: "getOne"
}, {
    method: "post",
    route: "/business",
    controller: BusinessController,
    action: "create"
}, {
    method: "put",
    route: "/business/:id",
    controller: BusinessController,
    action: "update"
}, {
    method: "delete",
    route: "/business/:id",
    controller: BusinessController,
    action: "remove"
}, {
    method: "get",
    route: "/admin/business",
    controller: BusinessController,
    action: "getAllAdmin"
}, {
    method: "get",
    route: "/hotel",
    controller: HotelController,
    action: "all"
},]