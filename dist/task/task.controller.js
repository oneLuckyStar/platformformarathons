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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const jwt_guard_1 = require("../auth/guards/jwt-guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const user_interface_1 = require("../user/user.interface");
const createTask_dto_1 = require("./dto/createTask.dto");
const getTaskInfo_dto_1 = require("./dto/getTaskInfo.dto");
const getTasks_dto_1 = require("./dto/getTasks.dto");
const task_service_1 = require("./task.service");
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    getAll() {
        return this.taskService.findAll();
    }
    getTaskInfo(query) {
        return this.taskService.findTaskInfo(query);
    }
    getNameById(query) {
        return this.taskService.findNameById(query.taskId);
    }
    async getTasks(query, req) {
        return await this.taskService.findByMarathonId(query, req.user._id);
    }
    async create(createTaskDto, req) {
        await this.taskService.create(createTaskDto, req.user._id);
        return this.taskService.findByMarathonId({
            marathonId: createTaskDto.marathonId,
        }, req.user._id);
    }
    async delete(query, req) {
        await this.taskService.delete(query.taskId);
        return this.taskService.findByMarathonId({ marathonId: query.marathonId }, req.user._id);
    }
};
__decorate([
    roles_decorator_1.hasRoles(user_interface_1.UserRole.ADMIN),
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getAll", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.Get('info'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getTaskInfo_dto_1.GetTaskInfoDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getTaskInfo", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.Get('/getNameById'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getNameById", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.Get('list'),
    __param(0, common_1.Query()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getTasks_dto_1.GetTasksDto, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getTasks", null);
__decorate([
    roles_decorator_1.hasRoles(user_interface_1.UserRole.TEACHER),
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Post('/new'),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createTask_dto_1.CreateTaskDto, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "create", null);
__decorate([
    roles_decorator_1.hasRoles(user_interface_1.UserRole.TEACHER),
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Get('/delete'),
    __param(0, common_1.Query()),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "delete", null);
TaskController = __decorate([
    common_1.Controller('task'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map