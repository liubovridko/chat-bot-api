import { SearchController } from "../controller/SearchController";



export const KeywordsRoutes = [{
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
}]