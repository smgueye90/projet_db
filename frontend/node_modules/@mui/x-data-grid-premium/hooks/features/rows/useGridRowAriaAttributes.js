"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridRowAriaAttributes = void 0;
var _internals = require("@mui/x-data-grid-pro/internals");
var _useGridPrivateApiContext = require("../../utils/useGridPrivateApiContext");
var _gridRowGroupingSelector = require("../rowGrouping/gridRowGroupingSelector");
const useGridRowAriaAttributes = () => {
  const apiRef = (0, _useGridPrivateApiContext.useGridPrivateApiContext)();
  const gridRowGroupingModel = (0, _internals.useGridSelector)(apiRef, _gridRowGroupingSelector.gridRowGroupingSanitizedModelSelector);
  return (0, _internals.useGridRowAriaAttributes)(gridRowGroupingModel.length > 0);
};
exports.useGridRowAriaAttributes = useGridRowAriaAttributes;