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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../entity/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    constructor() {
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    register(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password } = request.body;
            // check exist email
            const existingUser = yield this.userRepository.findOne({ where: { email } });
            if (existingUser) {
                const error = new Error('Email already exists');
                error.statusCode = 400;
                throw error;
            }
            // hash password
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            const user = Object.assign(new User_1.User(), {
                firstName,
                lastName,
                email,
                password: hashedPassword,
            });
            yield this.userRepository.save(user);
            return { message: 'User was created', user };
        });
    }
    login(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = request.body;
            // find user by email
            const user = yield this.userRepository.findOne({ where: { email } });
            if (!user) {
                const error = new Error('User not found, email does not exist');
                error.statusCode = 400;
                throw error;
            }
            // check password using bcrypt
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                const error = new Error('Invalid password');
                error.statusCode = 400;
                throw error;
            }
            if (user.role !== User_1.UserRole.ADMIN) {
                const error = new Error('Denied, requires admin rights');
                error.statusCode = 403;
                throw error;
            }
            // create JWT token
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.SECRET_KEY || 'default_secret', {
                expiresIn: process.env.TOKEN_EXPIRES,
            });
            return response.json({ user, token });
        });
    }
    all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.find();
        });
    }
    authMe(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(request.userId);
            const user = yield this.userRepository.findOne({
                where: { id }
            });
            if (!user) {
                const error = new Error('User not found');
                error.statusCode = 401;
                throw error;
            }
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
            if (!userToRemove) {
                const error = new Error('User not found');
                error.statusCode = 404;
                throw error;
            }
            yield this.userRepository.remove(userToRemove);
            return { message: "user has been removed" };
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map