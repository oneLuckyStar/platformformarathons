"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/services/auth.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./user.schema");
const mongoose_2 = require("mongoose");
let UserService = class UserService {
    constructor(userModel, authService) {
        this.userModel = userModel;
        this.authService = authService;
    }
    async findOne(id) {
        const user = await this.userModel
            .findById(id)
            .select('role _id name email')
            .exec();
        return user ? user : null;
    }
    async findAll() {
        const users = await this.userModel.find().exec();
        if (!users)
            return null;
        return users.map((user) => {
            delete user.password;
            return user;
        });
    }
    deleteOne(id) {
        return this.userModel.deleteOne(id).exec();
    }
    async updateOne(id, user) {
        let updateUser = Object.assign({}, user);
        if (user.password) {
            updateUser = Object.assign(Object.assign({}, user), { password: await this.authService.hashPassword(user.password) });
        }
        console.log(updateUser);
        await this.userModel.updateOne({ _id: id }, updateUser).exec();
        const newUser = await this.userModel
            .findById(id)
            .select('role _id name email password')
            .exec();
        return this.authService.generateJWT(newUser);
    }
    updateRoleOfUser(id, user) {
        return this.userModel.updateOne(id, user).exec();
    }
    async login(user) {
        const validUser = await this.validateUser(user.email, user.password);
        if (validUser) {
            return this.authService.generateJWT(validUser);
        }
        else {
            return 'Wrong Credentials';
        }
    }
    async validateUser(email, password) {
        const user = await this.userModel
            .findOne({ email })
            .select('role _id name email password')
            .exec();
        const isValid = await this.authService.comparePasswords(password, user.password);
        return isValid ? user : null;
    }
    findByMail(email) {
        return this.userModel.findOne({ email }).exec();
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        auth_service_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map