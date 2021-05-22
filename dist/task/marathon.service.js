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
const marathon_schema_1 = require("./marathon.schema");
const mongoose_2 = require("mongoose");
const transliteration_1 = require("transliteration");
const rxjs_1 = require("rxjs");
let MarathonService = class MarathonService {
    constructor(marathonModel) {
        this.marathonModel = marathonModel;
    }
    findAll() {
        return rxjs_1.from(this.marathonModel.find().sort('modifiedTs').exec());
    }
    findMy(username) {
        return rxjs_1.from(this.marathonModel.find({ subscribers: username }).sort('modifiedTs').exec());
    }
    async create(createMarathonDto) {
        const newMarathon = new this.marathonModel(Object.assign(Object.assign({}, createMarathonDto), { creatorId: '123', modifiedTs: new Date().toISOString(), nameId: transliteration_1.slugify(createMarathonDto.name) }));
        return newMarathon.save();
    }
};
MarathonService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(marathon_schema_1.Marathon.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MarathonService);
exports.MarathonService = MarathonService;
//# sourceMappingURL=marathon.service.js.map