"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridColumnMenuRowGroupItem = GridColumnMenuRowGroupItem;
var React = _interopRequireWildcard(require("react"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _ListItemIcon = _interopRequireDefault(require("@mui/material/ListItemIcon"));
var _ListItemText = _interopRequireDefault(require("@mui/material/ListItemText"));
var _xDataGridPro = require("@mui/x-data-grid-pro");
var _useGridApiContext = require("../hooks/utils/useGridApiContext");
var _gridRowGroupingSelector = require("../hooks/features/rowGrouping/gridRowGroupingSelector");
var _gridRowGroupingUtils = require("../hooks/features/rowGrouping/gridRowGroupingUtils");
var _useGridRootProps = require("../hooks/utils/useGridRootProps");
var _jsxRuntime = require("react/jsx-runtime");
function GridColumnMenuRowGroupItem(props) {
  const {
    colDef,
    onClick
  } = props;
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rowGroupingModel = (0, _xDataGridPro.useGridSelector)(apiRef, _gridRowGroupingSelector.gridRowGroupingSanitizedModelSelector);
  const columnsLookup = (0, _xDataGridPro.useGridSelector)(apiRef, _xDataGridPro.gridColumnLookupSelector);
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const renderUnGroupingMenuItem = field => {
    const ungroupColumn = event => {
      apiRef.current.removeRowGroupingCriteria(field);
      onClick(event);
    };
    const groupedColumn = columnsLookup[field];
    const name = groupedColumn.headerName ?? field;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_MenuItem.default, {
      onClick: ungroupColumn,
      disabled: !groupedColumn.groupable,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemIcon.default, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.columnMenuUngroupIcon, {
          fontSize: "small"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemText.default, {
        children: apiRef.current.getLocaleText('unGroupColumn')(name)
      })]
    }, field);
  };
  if (!colDef || !(0, _gridRowGroupingUtils.isGroupingColumn)(colDef.field)) {
    return null;
  }
  if (colDef.field === _gridRowGroupingUtils.GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(React.Fragment, {
      children: rowGroupingModel.map(renderUnGroupingMenuItem)
    });
  }
  return renderUnGroupingMenuItem((0, _gridRowGroupingUtils.getRowGroupingCriteriaFromGroupingField)(colDef.field));
}