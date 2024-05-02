import { HotelController } from "../controller/HotelController";



export const HotelRoutes = [{
    method: "get",
    route: "/hotel/:id",
    controller: HotelController,
    action: "one"
}, {
    method: "get",
    route: "/hotels",
    controller: HotelController,
    action: "all"
}]