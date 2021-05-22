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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const moment = require("moment");
const transliteration_1 = require("transliteration");
const marathon_service_1 = require("../marathon/marathon.service");
const task_schema_1 = require("./task.schema");
const mongoose_2 = require("mongoose");
let TaskService = class TaskService {
    constructor(taskModel, marathonService) {
        this.taskModel = taskModel;
        this.marathonService = marathonService;
    }
    findAll() {
        return this.taskModel.find().sort('modifiedTs').exec();
    }
    async findByMarathonId(query) {
        const tasks = await this.taskModel
            .find({ marathonId: query.marathonId, isActive: true })
            .select('endDate marathonId name nameId startDate creatorId')
            .sort('modifiedTs')
            .exec();
        return Promise.all(tasks.map(async (task) => {
            task.marathonName = (await this.marathonService.findById(query.marathonId)).name;
            return task;
        }));
    }
    async findTaskInfo(query) {
        const taskInfo = await this.taskModel
            .findOne({ marathonId: query.marathonId, nameId: query.taskId })
            .exec();
        taskInfo.marathonName = (await this.marathonService.findById(query.marathonId)).name;
        return taskInfo;
    }
    async findByName(name, marathonId) {
        return this.taskModel.find({ name, marathonId }).exec();
    }
    async create(createTaskDto, userId) {
        const newTask = new this.taskModel({
            name: createTaskDto.name,
            nameId: `${transliteration_1.slugify(createTaskDto.name)}_${moment().format('DD-MM-YYYY-HH-mm-ss')}`,
            startDate: createTaskDto.startDate,
            endDate: createTaskDto.endDate,
            text: createTaskDto.text,
            marathonId: createTaskDto.marathonId,
            creatorId: userId,
            isActive: true,
            modifiedTs: new Date().toISOString(),
        });
        return newTask.save();
    }
    async delete(nameId) {
        return this.taskModel.updateOne({ nameId }, { isActive: false }).exec();
    }
};
TaskService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(task_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        marathon_service_1.MarathonService])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map