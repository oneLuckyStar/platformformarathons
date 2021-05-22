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
exports.AnswerController = exports.storage = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const path = require("path");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const jwt_guard_1 = require("../auth/guards/jwt-guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const user_interface_1 = require("../user/user.interface");
const user_service_1 = require("../user/user.service");
const answer_service_1 = require("./answer.service");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const sendFile_dto_1 = require("./dto/sendFile.dto");
const sendResult_dto_1 = require("./dto/sendResult.dto");
const sendText_dto_1 = require("./dto/sendText.dto");
exports.storage = {
    storage: multer_1.diskStorage({
        destination: './public/uploads/answers',
        filename: (req, file, cb) => {
            const filename = path.parse(file.originalname).name.replace(/\s/g, '') + uuid_1.v4();
            const extension = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`);
        },
    }),
};
let AnswerController = class AnswerController {
    constructor(answerService, userService) {
        this.answerService = answerService;
        this.userService = userService;
    }
    getAll() {
        return this.answerService.findAll();
    }
    my(req, { marathonId, taskId }) {
        return this.answerService.findMyForTask(marathonId, taskId, req.user._id);
    }
    async sendFile(file, sendFileDto, req) {
        return this.answerService.addFile(sendFileDto, req.user._id, file.originalname, file.path);
    }
    async deleteFile({ marathonId, taskId, path, }, req) {
        await this.answerService.delete(marathonId, taskId, req.user._id, path);
        return this.answerService.findMyForTask(marathonId, taskId, req.user._id);
    }
    async allForTask(req, { marathonId, taskId }) {
        const answers = await this.answerService.findAllForTask(marathonId, taskId);
        return Promise.all(answers.map(async (answer) => {
            return {
                files: answer.files,
                text: answer.text,
                creatorId: answer.creatorId,
                taskId: answer.taskId,
                marathonId: answer.marathonId,
                modifiedTs: answer.modifiedTs,
                result: answer.result,
                comment: answer.comment,
                creator: await this.userService.findOne(answer.creatorId),
            };
        }));
    }
    async countForTask(req, { marathonId, taskId }) {
        return (await this.answerService.findAllForTask(marathonId, taskId)).length;
    }
    async sendText(sendTextDto, req) {
        return await this.answerService.addText(sendTextDto, req.user._id);
    }
    async sendResult(sendResultDto, req) {
        return await this.answerService.addResult(sendResultDto, req.user._id);
    }
};
__decorate([
    roles_decorator_1.hasRoles(user_interface_1.UserRole.TEACHER),
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "getAll", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.Get('my'),
    __param(0, common_1.Request()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "my", null);
__decorate([
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', exports.storage)),
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.Post('sendFile'),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Body()),
    __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, sendFile_dto_1.SendFileDto, Object]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "sendFile", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.Get('deleteFile'),
    __param(0, common_1.Query()),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "deleteFile", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.Get('allForTask'),
    __param(0, common_1.Request()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "allForTask", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.Get('countForTask'),
    __param(0, common_1.Request()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "countForTask", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.Post('sendText'),
    __param(0, common_1.Body()),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sendText_dto_1.SendTextDto, Object]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "sendText", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    common_1.Post('sendResult'),
    __param(0, common_1.Body()),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sendResult_dto_1.SendResultDto, Object]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "sendResult", null);
AnswerController = __decorate([
    common_1.Controller('answer'),
    __metadata("design:paramtypes", [answer_service_1.AnswerService,
        user_service_1.UserService])
], AnswerController);
exports.AnswerController = AnswerController;
//# sourceMappingURL=answer.controller.js.map