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
exports.MarathonService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const task_service_1 = require("../task/task.service");
const user_service_1 = require("../user/user.service");
const marathon_schema_1 = require("./marathon.schema");
const mongoose_2 = require("mongoose");
const transliteration_1 = require("transliteration");
const moment = require("moment");
let MarathonService = class MarathonService {
    constructor(marathonModel, userService, taskService) {
        this.marathonModel = marathonModel;
        this.userService = userService;
        this.taskService = taskService;
    }
    findAll() {
        return this.marathonModel.find().sort('modifiedTs').exec();
    }
    async findMy(email, id) {
        const marathons = await this.marathonModel
            .find({
            $or: [{ subscribers: email }, { creatorId: id }],
            isActive: true,
        })
            .sort({ modifiedTs: 'desc' })
            .exec();
        return Promise.all(marathons.map(async (marathon) => {
            marathon.creatorInfo = await this.userService.findOne(marathon.creatorId);
            return marathon;
        }));
    }
    async findMyWithStat(email, id) {
        const marathons = await this.findMy(email, id);
        return Promise.all(marathons.map(async (marathon) => {
            const taskIds = await this.taskService.taskIdsByMarathonId(marathon.nameId);
            marathon.stat = {
                taskCount: taskIds.length,
                doneCount: 1,
                skipCount: 0,
            };
            return marathon;
        }));
    }
    async findById(nameId) {
        return this.marathonModel.findOne({ nameId }).exec();
    }
    async create(createMarathonDto, id) {
        const newMarathon = new this.marathonModel({
            name: createMarathonDto.name,
            nameId: `${transliteration_1.slugify(createMarathonDto.name)}_${moment().format('DD-MM-YYYY-HH-mm-ss')}`,
            creatorId: id,
            startDate: createMarathonDto.startDate,
            endDate: createMarathonDto.endDate,
            img: createMarathonDto.img,
            modifiedTs: new Date().toISOString(),
            subscribers: createMarathonDto.subscribers,
            isActive: true,
        });
        return newMarathon.save();
    }
    async findByName(name) {
        return this.marathonModel.find({ name }).exec();
    }
    async findNameById(marathonId) {
        return this.marathonModel
            .findOne({ nameId: marathonId })
            .select('name')
            .exec();
    }
    async delete(nameId) {
        return this.marathonModel.updateOne({ nameId }, { isActive: false }).exec();
    }
};
MarathonService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(marathon_schema_1.Marathon.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        task_service_1.TaskService])
], MarathonService);
exports.MarathonService = MarathonService;
//# sourceMappingURL=marathon.service.js.map