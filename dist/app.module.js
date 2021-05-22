"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const answer_module_1 = require("./answer/answer.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const task_module_1 = require("./task/task.module");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const serve_static_module_1 = require("@nestjs/serve-static/dist/serve-static.module");
const path_1 = require("path");
const mongoose_1 = require("@nestjs/mongoose");
const marathon_module_1 = require("./marathon/marathon.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            serve_static_module_1.ServeStaticModule.forRoot({
                rootPath: path_1.join(__dirname, '../', 'public'),
            }),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRoot('mongodb+srv://dbUser:passdb@cluster0.jxgvi.mongodb.net/marathons?retryWrites=true&w=majority'),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            marathon_module_1.MarathonModule,
            task_module_1.TaskModule,
            answer_module_1.AnswerModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map