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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarathonController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const jwt_guard_1 = require("../auth/guards/jwt-guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const user_interface_1 = require("../user/user.interface");
const marathon_service_1 = require("./marathon.service");
const create_marathon_dto_1 = require("./dto/create-marathon.dto");
const rxjs_1 = require("rxjs");
let MarathonController = class MarathonController {
    constructor(marathonsService) {
        this.marathonsService = marathonsService;
    }
    getAll() {
        return this.marathonsService.findAll();
    }
    getMyMarathons(req) {
        return this.marathonsService.findMy(req.user.username);
    }
    create(createMarathonDto) {
        return this.marathonsService.create(createMarathonDto);
    }
};
__decorate([
    roles_decorator_1.hasRoles(user_interface_1.UserRole.ADMIN),
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], MarathonController.prototype, "getAll", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.Get('/my'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], MarathonController.prototype, "getMyMarathons", null);
__decorate([
    common_1.Post('/new'),
    common_1.HttpCode(common_1.HttpStatus.CREATED),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_marathon_dto_1.CreateMarathonDto !== "undefined" && create_marathon_dto_1.CreateMarathonDto) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], MarathonController.prototype, "create", null);
MarathonController = __decorate([
    common_1.Controller('marathon'),
    __metadata("design:paramtypes", [marathon_service_1.MarathonService])
], MarathonController);
exports.MarathonController = MarathonController;
//# sourceMappingURL=marathon.controller.js.map