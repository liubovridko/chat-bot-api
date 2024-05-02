import { BusinessController } from "../controller/BusinessController";
import { AuthController } from "../controller/AuthController";
import { HotelController } from "../controller/HotelController";
import { SearchController } from "../controller/SearchController";
import { CategoryController } from "../controller/CategoryController";
import { authenticateToken } from '../middleware/authenticateToken';
import { fileController } from '../controller/FileController';
import { upload } from '../middleware/uploadFile';


export const Routes = [{
    method: "get",
    route: "/users",
    controller: AuthController,
    action: "all"
}, {
    method: "get",
    route: "/auth/me",
    controller: AuthController,
    middleware: authenticateToken,
    action: "authMe"
    
}, {
    method: "post",
    route: "/auth/login",
    controller: AuthController,
    action: "login"
}, {
    method: "post",
    route: "/auth/register",
    controller: AuthController,
    action: "register"
}, {
    method: "delete",
    route: "/users/:id",
    controller: AuthController,
    action: "remove"
}, {
    method: "post",
    route: "/parse-business",
    controller: BusinessController,
    middleware: authenticateToken,
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
},  {
    method: "post",
    route: "/upload",
    controller: fileController,
    middleware: [authenticateToken, upload],
    action: "uploadImage"
}, {
    method: "get",
    route: "/search",
    controller: SearchController,
    action: "searchByKeywords"
}, {
    method: "get",
    route: "/keywords",
    controller: SearchController,
    action: "getAll"
},  {
    method: "get",
    route: "/keywords/statistics",
    controller: SearchController,
    action: "getSearchQueryStatistic"
},{
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
}, {
    method: "get",
    route: "/hotel",
    controller: HotelController,
    action: "one"
}, {
    method: "get",
    route: "/hotels",
    controller: HotelController,
    action: "all"
}, {
    method: "get",
    route: "/categories",
    controller: CategoryController,
    action: "all"
},]