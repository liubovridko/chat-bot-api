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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../entity/User");
class UserController {
    constructor() {
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.find();
        });
    }
    one(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(request.params.id);
            const user = yield this.userRepository.findOne({
                where: { id }
            });
            if (!user)
                throw Error('unregistered user');
            return user;
        });
    }
    save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password } = request.body;
            const user = Object.assign(new User_1.User(), {
                firstName,
                lastName,
                email,
                password
            });
            yield this.userRepository.save(user);
            return { message: "User was created" };
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //const id = parseInt(request.params.id)
            const userToRemove = yield this.userRepository.findOneBy({ id: Number(request.params.id) });
            if (!userToRemove)
                throw Error('user does not exist');
            // if (!userToRemove) {
            //     return "this user not exist"
            // }
            yield this.userRepository.remove(userToRemove);
            return { message: "user has been removed" };
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map