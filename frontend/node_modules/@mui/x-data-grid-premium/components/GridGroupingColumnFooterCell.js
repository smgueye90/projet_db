"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridGroupingColumnFooterCell = GridGroupingColumnFooterCell;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _useGridRootProps = require("../hooks/utils/useGridRootProps");
var _GridFooterCell = require("./GridFooterCell");
var _jsxRuntime = require("react/jsx-runtime");
function GridGroupingColumnFooterCell(props) {
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const sx = {
    ml: 0
  };
  if (props.rowNode.parent == null) {
    sx.ml = 0;
  } else if (rootProps.rowGroupingColumnMode === 'multiple') {
    sx.ml = 2;
  } else {
    sx.ml = theme => `calc(var(--DataGrid-cellOffsetMultiplier) * ${theme.spacing(props.rowNode.depth)})`;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridFooterCell.GridFooterCell, (0, _extends2.default)({
    sx: sx
  }, props));
}