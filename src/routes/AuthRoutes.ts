import { AuthController } from "../controller/AuthController";
import { authenticateToken } from '../middleware/authenticateToken';


export const AuthRoutes = [{
    method: "get",
    route: "/users",
    controller: AuthController,
    middleware: authenticateToken,
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
    middleware: authenticateToken,
    action: "remove"
}]