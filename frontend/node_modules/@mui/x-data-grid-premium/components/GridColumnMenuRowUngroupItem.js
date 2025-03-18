"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridColumnMenuRowUngroupItem = GridColumnMenuRowUngroupItem;
var React = _interopRequireWildcard(require("react"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _ListItemIcon = _interopRequireDefault(require("@mui/material/ListItemIcon"));
var _ListItemText = _interopRequireDefault(require("@mui/material/ListItemText"));
var _xDataGridPro = require("@mui/x-data-grid-pro");
var _useGridApiContext = require("../hooks/utils/useGridApiContext");
var _gridRowGroupingSelector = require("../hooks/features/rowGrouping/gridRowGroupingSelector");
var _useGridRootProps = require("../hooks/utils/useGridRootProps");
var _jsxRuntime = require("react/jsx-runtime");
function GridColumnMenuRowUngroupItem(props) {
  const {
    colDef,
    onClick
  } = props;
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rowGroupingModel = (0, _xDataGridPro.useGridSelector)(apiRef, _gridRowGroupingSelector.gridRowGroupingSanitizedModelSelector);
  const columnsLookup = (0, _xDataGridPro.useGridSelector)(apiRef, _xDataGridPro.gridColumnLookupSelector);
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  if (!colDef.groupable) {
    return null;
  }
  const ungroupColumn = event => {
    apiRef.current.removeRowGroupingCriteria(colDef.field);
    onClick(event);
  };
  const groupColumn = event => {
    apiRef.current.addRowGroupingCriteria(colDef.field);
    onClick(event);
  };
  const name = columnsLookup[colDef.field].headerName ?? colDef.field;
  if (rowGroupingModel.includes(colDef.field)) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_MenuItem.default, {
      onClick: ungroupColumn,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemIcon.default, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.columnMenuUngroupIcon, {
          fontSize: "small"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemText.default, {
        children: apiRef.current.getLocaleText('unGroupColumn')(name)
      })]
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_MenuItem.default, {
    onClick: groupColumn,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemIcon.default, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.columnMenuGroupIcon, {
        fontSize: "small"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemText.default, {
      children: apiRef.current.getLocaleText('groupColumn')(name)
    })]
  });
}