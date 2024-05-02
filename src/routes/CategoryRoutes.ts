import { CategoryController } from "../controller/CategoryController";



export const CategoryRoutes = [{
    method: "get",
    route: "/categories",
    controller: CategoryController,
    action: "all"
}]