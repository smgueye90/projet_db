"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridAriaAttributes = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _internals = require("@mui/x-data-grid-pro/internals");
var _gridRowGroupingSelector = require("../features/rowGrouping/gridRowGroupingSelector");
var _useGridPrivateApiContext = require("./useGridPrivateApiContext");
var _useGridRootProps = require("./useGridRootProps");
const useGridAriaAttributes = () => {
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const ariaAttributesPro = (0, _internals.useGridAriaAttributes)();
  const apiRef = (0, _useGridPrivateApiContext.useGridPrivateApiContext)();
  const gridRowGroupingModel = (0, _internals.useGridSelector)(apiRef, _gridRowGroupingSelector.gridRowGroupingSanitizedModelSelector);
  const ariaAttributesPremium = rootProps.experimentalFeatures?.ariaV8 && gridRowGroupingModel.length > 0 ? {
    role: 'treegrid'
  } : {};
  return (0, _extends2.default)({}, ariaAttributesPro, ariaAttributesPremium);
};
exports.useGridAriaAttributes = useGridAriaAttributes;