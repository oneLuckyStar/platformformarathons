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
exports.AnswerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const answer_schema_1 = require("./answer.schema");
const mongoose_2 = require("mongoose");
let AnswerService = class AnswerService {
    constructor(answerModel) {
        this.answerModel = answerModel;
    }
    findAll() {
        return this.answerModel.find().sort('modifiedTs').exec();
    }
    findMyForTask(marathonId, taskId, creatorId) {
        return this.answerModel
            .findOne({
            marathonId,
            taskId,
            creatorId,
        })
            .exec();
    }
    findAllForTask(marathonId, taskId) {
        return this.answerModel
            .find({
            marathonId,
            taskId,
        })
            .sort({ modifiedTs: 'desc' })
            .exec();
    }
    async addFile(sendFileDto, creatorId, name, path) {
        const answer = await this.findMyForTask(sendFileDto.marathonId, sendFileDto.taskId, creatorId);
        if (!answer) {
            const newAnswer = new this.answerModel({
                marathonId: sendFileDto.marathonId,
                taskId: sendFileDto.taskId,
                creatorId: creatorId,
                modifiedTs: new Date().toISOString(),
                text: '',
                result: null,
                files: [
                    {
                        name: name,
                        path: path,
                    },
                ],
            });
            await newAnswer.save();
        }
        else {
            await this.answerModel.updateOne({
                marathonId: sendFileDto.marathonId,
                taskId: sendFileDto.taskId,
                creatorId: creatorId,
            }, {
                files: [...answer.files, { name: name, path: path }],
                modifiedTs: new Date().toISOString(),
            });
        }
        return this.findMyForTask(sendFileDto.marathonId, sendFileDto.taskId, creatorId);
    }
    async addText(sendTextDto, creatorId) {
        const answer = await this.findMyForTask(sendTextDto.marathonId, sendTextDto.taskId, creatorId);
        if (!answer) {
            const newAnswer = new this.answerModel({
                marathonId: sendTextDto.marathonId,
                taskId: sendTextDto.taskId,
                creatorId: creatorId,
                modifiedTs: new Date().toISOString(),
                text: sendTextDto.text,
                result: null,
                files: [],
            });
            await newAnswer.save();
        }
        else {
            await this.answerModel.updateOne({
                marathonId: sendTextDto.marathonId,
                taskId: sendTextDto.taskId,
                creatorId: creatorId,
            }, {
                text: sendTextDto.text,
                modifiedTs: new Date().toISOString(),
            });
        }
        return this.findMyForTask(sendTextDto.marathonId, sendTextDto.taskId, creatorId);
    }
    async delete(marathonId, taskId, userId, path) {
        return this.answerModel
            .updateOne({
            marathonId,
            taskId,
            creatorId: userId,
        }, {
            $pull: { files: { path } },
        })
            .exec();
    }
    async addResult(sendResultDto, creatorId) {
        await this.answerModel.updateOne({
            marathonId: sendResultDto.marathonId,
            taskId: sendResultDto.taskId,
            creatorId: creatorId,
        }, {
            result: sendResultDto.result,
            comment: sendResultDto.comment,
        });
        return this.findMyForTask(sendResultDto.marathonId, sendResultDto.taskId, creatorId);
    }
};
AnswerService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(answer_schema_1.Answer.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AnswerService);
exports.AnswerService = AnswerService;
//# sourceMappingURL=answer.service.js.map