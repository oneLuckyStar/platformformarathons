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
exports.UserController = exports.storage = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const jwt_guard_1 = require("../auth/guards/jwt-guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const path = require("path");
const path_1 = require("path");
const user_schema_1 = require("./user.schema");
const user_interface_1 = require("./user.interface");
exports.storage = {
    storage: multer_1.diskStorage({
        destination: './uploads/profileimages',
        filename: (req, file, cb) => {
            const filename = path.parse(file.originalname).name.replace(/\s/g, '') + uuid_1.v4();
            const extension = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`);
        },
    }),
};
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async login(user) {
        return {
            accessToken: await this.userService.login(user),
        };
    }
    me(req) {
        return req.user;
    }
    findOne(params) {
        return this.userService.findOne(params.id);
    }
    deleteOne(id) {
        return this.userService.deleteOne(id);
    }
    async updateOne(user, req) {
        return {
            accessToken: await this.userService.updateOne(req.user._id, user),
        };
    }
    updateRoleOfUser(id, user) {
        return this.userService.updateRoleOfUser(id, user);
    }
    findProfileImage(imagename, res) {
        return res.sendFile(path_1.join(process.cwd(), 'uploads/profileimages/' + imagename));
    }
};
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.Get('me'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", user_schema_1.User)
], UserController.prototype, "me", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    roles_decorator_1.hasRoles(user_interface_1.UserRole.ADMIN),
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteOne", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.Post('update'),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateOne", null);
__decorate([
    roles_decorator_1.hasRoles(user_interface_1.UserRole.ADMIN),
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Put(':id/role'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateRoleOfUser", null);
__decorate([
    common_1.Get('profile-image/:imagename'),
    __param(0, common_1.Param('imagename')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findProfileImage", null);
UserController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map