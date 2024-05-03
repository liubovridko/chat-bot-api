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
const bcrypt_1 = require("bcrypt");
const User_1 = require("../../entity/User");
class UserSeeder {
    run(dataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = dataSource.getRepository(User_1.User);
            const data = {
                firstName: 'admin',
                lastName: 'admin',
                email: process.env.ADMIN_LOGIN,
                password: yield (0, bcrypt_1.hash)(process.env.ADMIN_PASS, JSON.parse(process.env.SALT)),
                role: User_1.UserRole.ADMIN
            };
            const user = yield repository.findOneBy({ email: data.email });
            // Insert only one record with this username.
            if (!user) {
                yield repository.insert([data]);
            }
        });
    }
}
exports.default = UserSeeder;
//# sourceMappingURL=user.seeder.js.map