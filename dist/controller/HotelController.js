"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelController = void 0;
var data_source_1 = require("../data-source");
var Hotel_1 = require("../entity/Hotel");
var HotelController = /** @class */ (function () {
    function HotelController() {
        this.userRepository = data_source_1.AppDataSource.getRepository(Hotel_1.Hotel);
    }
    HotelController.prototype.all = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userRepository.find()];
            });
        });
    };
    HotelController.prototype.one = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = parseInt(request.params.id);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { id: id }
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, "unregistered user"];
                        }
                        return [2 /*return*/, user];
                }
            });
        });
    };
    HotelController.prototype.save = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, url, description, chatBot_key, hotel;
            return __generator(this, function (_b) {
                _a = request.body, title = _a.title, url = _a.url, description = _a.description, chatBot_key = _a.chatBot_key;
                hotel = Object.assign(new Hotel_1.Hotel(), {
                    title: title,
                    url: url,
                    description: description,
                    chatBot_key: chatBot_key
                });
                return [2 /*return*/, this.userRepository.save(hotel)];
            });
        });
    };
    HotelController.prototype.remove = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var hotelToRemove;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOneBy({ id: parseInt(request.params.id) })];
                    case 1:
                        hotelToRemove = _a.sent();
                        if (!hotelToRemove)
                            throw Error('user does not exist');
                        // if (!userToRemove) {
                        //     return "this user not exist"
                        // }
                        return [4 /*yield*/, this.userRepository.remove(hotelToRemove)];
                    case 2:
                        // if (!userToRemove) {
                        //     return "this user not exist"
                        // }
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return HotelController;
}());
exports.HotelController = HotelController;
//# sourceMappingURL=HotelController.js.map