"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarathonModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("../user/user.module");
const marathon_controller_1 = require("./marathon.controller");
const mongoose_1 = require("@nestjs/mongoose");
const marathon_schema_1 = require("./marathon.schema");
const marathon_service_1 = require("./marathon.service");
const auth_module_1 = require("../auth/auth.module");
let MarathonModule = class MarathonModule {
};
MarathonModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: marathon_schema_1.Marathon.name, schema: marathon_schema_1.MarathonSchema },
            ]),
            auth_module_1.AuthModule,
            user_module_1.UserModule
        ],
        controllers: [marathon_controller_1.MarathonController],
        providers: [marathon_service_1.MarathonService],
    })
], MarathonModule);
exports.MarathonModule = MarathonModule;
//# sourceMappingURL=marathon.module.js.map