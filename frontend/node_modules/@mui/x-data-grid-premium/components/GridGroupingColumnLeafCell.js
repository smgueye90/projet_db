"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridGroupingColumnLeafCell = GridGroupingColumnLeafCell;
var React = _interopRequireWildcard(require("react"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _useGridRootProps = require("../hooks/utils/useGridRootProps");
var _jsxRuntime = require("react/jsx-runtime");
function GridGroupingColumnLeafCell(props) {
  const {
    rowNode
  } = props;
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Box.default, {
    sx: [rootProps.rowGroupingColumnMode === 'multiple' ? {
      ml: 1
    } : theme => ({
      ml: `calc(var(--DataGrid-cellOffsetMultiplier) * var(--depth) * ${theme.spacing(1)})`
    })],
    style: {
      '--depth': rowNode.depth
    },
    children: props.formattedValue ?? props.value
  });
}