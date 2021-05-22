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
exports.MarathonController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const jwt_guard_1 = require("../auth/guards/jwt-guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const user_interface_1 = require("../user/user.interface");
const marathon_service_1 = require("./marathon.service");
const createMarathon_dto_1 = require("./dto/createMarathon.dto");
let MarathonController = class MarathonController {
    constructor(marathonsService) {
        this.marathonsService = marathonsService;
    }
    getAll() {
        return this.marathonsService.findAll();
    }
    getNameById(query) {
        return this.marathonsService.findNameById(query.marathonId);
    }
    getMyMarathons(req) {
        return this.marathonsService.findMyWithStat(req.user.email, req.user._id);
    }
    async create(createMarathonDto, req) {
        await this.marathonsService.create(createMarathonDto, req.user._id);
        return this.marathonsService.findMy(req.user.email, req.user._id);
    }
    async delete(query, req) {
        await this.marathonsService.delete(query.marathonId);
        return this.marathonsService.findMy(req.user.email, req.user._id);
    }
};
__decorate([
    roles_decorator_1.hasRoles(user_interface_1.UserRole.ADMIN),
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MarathonController.prototype, "getAll", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.Get('/getNameById'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MarathonController.prototype, "getNameById", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.Get('/my'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MarathonController.prototype, "getMyMarathons", null);
__decorate([
    roles_decorator_1.hasRoles(user_interface_1.UserRole.TEACHER),
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Post('/new'),
    __param(0, common_1.Body()),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createMarathon_dto_1.CreateMarathonDto, Object]),
    __metadata("design:returntype", Promise)
], MarathonController.prototype, "create", null);
__decorate([
    roles_decorator_1.hasRoles(user_interface_1.UserRole.TEACHER),
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Get('/delete'),
    __param(0, common_1.Query()),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarathonController.prototype, "delete", null);
MarathonController = __decorate([
    common_1.Controller('marathon'),
    __metadata("design:paramtypes", [marathon_service_1.MarathonService])
], MarathonController);
exports.MarathonController = MarathonController;
//# sourceMappingURL=marathon.controller.js.map