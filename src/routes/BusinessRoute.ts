import { BusinessController } from "../controller/BusinessController"

export const Routes = [{
    method: "get",
    route: "/",
    controller: BusinessController,
    action: "all"
}, {
    method: "get",
    route: "/:id",
    controller: BusinessController,
    action: "one"
}, {
    method: "post",
    route: "/",
    controller: BusinessController,
    action: "saveBusinessesFromJson"
}, {
    method: "delete",
    route: "/:id",
    controller: BusinessController,
    action: "remove"
}]