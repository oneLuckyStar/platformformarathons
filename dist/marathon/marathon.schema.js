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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarathonSchema = exports.Marathon = exports.MarathonStat = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const user_schema_1 = require("../user/user.schema");
let MarathonStat = class MarathonStat {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], MarathonStat.prototype, "taskCount", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], MarathonStat.prototype, "doneCount", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], MarathonStat.prototype, "skipCount", void 0);
MarathonStat = __decorate([
    mongoose_1.Schema()
], MarathonStat);
exports.MarathonStat = MarathonStat;
let Marathon = class Marathon {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Marathon.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Marathon.prototype, "nameId", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", mongoose.Schema.Types.ObjectId)
], Marathon.prototype, "creatorId", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", user_schema_1.User)
], Marathon.prototype, "creatorInfo", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Marathon.prototype, "startDate", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Marathon.prototype, "endDate", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Marathon.prototype, "img", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Marathon.prototype, "modifiedTs", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Array)
], Marathon.prototype, "subscribers", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Boolean)
], Marathon.prototype, "isActive", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", MarathonStat)
], Marathon.prototype, "stat", void 0);
Marathon = __decorate([
    mongoose_1.Schema()
], Marathon);
exports.Marathon = Marathon;
exports.MarathonSchema = mongoose_1.SchemaFactory.createForClass(Marathon);
//# sourceMappingURL=marathon.schema.js.map