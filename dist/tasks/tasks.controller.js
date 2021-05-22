'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.TasksController = void 0;
const common_1 = require('@nestjs/common');
const tasks_service_1 = require('./tasks.service');
const create_tasks_dto_1 = require('./dto/create-tasks.dto');
let TasksController = class TasksController {
  constructor(tasksService) {
    this.tasksService = tasksService;
  }
  getAllById(reqParam) {
    return this.tasksService.getAllById(reqParam.id);
  }
  getTask(reqParam) {
    return this.tasksService.getTask(reqParam.taskId, reqParam.marathonId);
  }
  create(createTaskDto) {
    return this.tasksService.create(createTaskDto);
  }
};
__decorate(
  [
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [create_tasks_dto_1.GetAllByIdParamsDto]),
    __metadata('design:returntype', Promise),
  ],
  TasksController.prototype,
  'getAllById',
  null,
);
__decorate(
  [
    common_1.Get('/task'),
    __param(0, common_1.Query()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [create_tasks_dto_1.GetTaskParamsDto]),
    __metadata('design:returntype', Promise),
  ],
  TasksController.prototype,
  'getTask',
  null,
);
__decorate(
  [
    common_1.Post('/new'),
    common_1.HttpCode(common_1.HttpStatus.CREATED),
    __param(0, common_1.Body()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [create_tasks_dto_1.CreateTasksDto]),
    __metadata('design:returntype', Promise),
  ],
  TasksController.prototype,
  'create',
  null,
);
TasksController = __decorate(
  [
    common_1.Controller('tasks'),
    __metadata('design:paramtypes', [tasks_service_1.TasksService]),
  ],
  TasksController,
);
exports.TasksController = TasksController;
//# sourceMappingURL=tasks.controller.js.map
