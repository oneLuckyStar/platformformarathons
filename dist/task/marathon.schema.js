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
exports.MarathonSchema = exports.Marathon = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
let Marathon = class Marathon {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", mongoose.Schema.Types.ObjectId)
], Marathon.prototype, "_id", void 0);
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
Marathon = __decorate([
    mongoose_1.Schema()
], Marathon);
exports.Marathon = Marathon;
exports.MarathonSchema = mongoose_1.SchemaFactory.createForClass(Marathon);
//# sourceMappingURL=marathon.schema.js.map