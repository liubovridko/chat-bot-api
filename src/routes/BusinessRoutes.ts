import { BusinessController } from "../controller/BusinessController";
import { authenticateToken } from '../middleware/authenticateToken';


export const BusinessRoutes = [{
    method: "post",
    route: "/parse-business",
    controller: BusinessController,
    action: "parseBusiness"
}, {
    method: "get",
    route: "/business",
    controller: BusinessController,
    action: "getAll"
},, {
    method: "get",
    route: "/admin/business",
    controller: BusinessController,
    action: "getAllAdmin"
}, {
    method: "get",
    route: "/business/:id",
    controller: BusinessController,
    action: "getOne"
}, {
    method: "post",
    route: "/business",
    controller: BusinessController,
    middleware: authenticateToken,
    action: "create"
    
}, {
    method: "put",
    route: "/business/:id",
    controller: BusinessController,
    middleware: authenticateToken,
    action: "update"
    
}, {
    method: "delete",
    route: "/business/:id",
    controller: BusinessController,
    action: "remove",
    middleware: authenticateToken
}, {
    method: "get",
    route: "/admin/business",
    controller: BusinessController,
    action: "getAllAdmin"
}]