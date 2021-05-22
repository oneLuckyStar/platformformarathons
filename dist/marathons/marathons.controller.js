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
exports.MarathonsController = void 0;
const common_1 = require('@nestjs/common');
const marathons_service_1 = require('./marathons.service');
const create_marathon_dto_1 = require('./dto/create-marathon.dto');
let MarathonsController = class MarathonsController {
  constructor(marathonsService) {
    this.marathonsService = marathonsService;
  }
  getAll() {
    return this.marathonsService.getAll();
  }
  getMyMarathons() {
    return this.marathonsService.getAll();
  }
  create(createMarathonDto) {
    return this.marathonsService.create(createMarathonDto);
  }
};
__decorate(
  [
    common_1.Get(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', Promise),
  ],
  MarathonsController.prototype,
  'getAll',
  null,
);
__decorate(
  [
    common_1.Get('/my'),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', Promise),
  ],
  MarathonsController.prototype,
  'getMyMarathons',
  null,
);
__decorate(
  [
    common_1.Post('/new'),
    common_1.HttpCode(common_1.HttpStatus.CREATED),
    __param(0, common_1.Body()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [create_marathon_dto_1.CreateMarathonDto]),
    __metadata('design:returntype', Promise),
  ],
  MarathonsController.prototype,
  'create',
  null,
);
MarathonsController = __decorate(
  [
    common_1.Controller('marathons'),
    __metadata('design:paramtypes', [marathons_service_1.MarathonsService]),
  ],
  MarathonsController,
);
exports.MarathonsController = MarathonsController;
//# sourceMappingURL=marathons.controller.js.map
