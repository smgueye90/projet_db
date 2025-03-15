"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _icons = require("./icons");
const iconsSlots = {
  columnMenuUngroupIcon: _icons.GridWorkspacesIcon,
  columnMenuGroupIcon: _icons.GridGroupWorkIcon,
  columnMenuAggregationIcon: _icons.GridFunctionsIcon
};
const materialSlots = (0, _extends2.default)({}, iconsSlots);
var _default = exports.default = materialSlots;