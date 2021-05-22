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
Object.defineProperty(exports, '__esModule', { value: true });
exports.MarathonsModule = void 0;
const common_1 = require('@nestjs/common');
const marathons_controller_1 = require('./marathons.controller');
const mongoose_1 = require('@nestjs/mongoose');
const marathon_schema_1 = require('./schemas/marathon.schema');
const marathons_service_1 = require('./marathons.service');
let MarathonsModule = class MarathonsModule {};
MarathonsModule = __decorate(
  [
    common_1.Module({
      imports: [
        mongoose_1.MongooseModule.forFeature([
          {
            name: marathon_schema_1.Marathon.name,
            schema: marathon_schema_1.MarathonSchema,
          },
        ]),
      ],
      controllers: [marathons_controller_1.MarathonsController],
      providers: [marathons_service_1.MarathonsService],
    }),
  ],
  MarathonsModule,
);
exports.MarathonsModule = MarathonsModule;
//# sourceMappingURL=marathons.module.js.map
