import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useGridSelector, gridColumnLookupSelector } from '@mui/x-data-grid-pro';
import { useGridApiContext } from "../hooks/utils/useGridApiContext.js";
import { gridRowGroupingSanitizedModelSelector } from "../hooks/features/rowGrouping/gridRowGroupingSelector.js";
import { getRowGroupingCriteriaFromGroupingField, GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD, isGroupingColumn } from "../hooks/features/rowGrouping/gridRowGroupingUtils.js";
import { useGridRootProps } from "../hooks/utils/useGridRootProps.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function GridColumnMenuRowGroupItem(props) {
  const {
    colDef,
    onClick
  } = props;
  const apiRef = useGridApiContext();
  const rowGroupingModel = useGridSelector(apiRef, gridRowGroupingSanitizedModelSelector);
  const columnsLookup = useGridSelector(apiRef, gridColumnLookupSelector);
  const rootProps = useGridRootProps();
  const renderUnGroupingMenuItem = field => {
    const ungroupColumn = event => {
      apiRef.current.removeRowGroupingCriteria(field);
      onClick(event);
    };
    const groupedColumn = columnsLookup[field];
    const name = groupedColumn.headerName ?? field;
    return /*#__PURE__*/_jsxs(MenuItem, {
      onClick: ungroupColumn,
      disabled: !groupedColumn.groupable,
      children: [/*#__PURE__*/_jsx(ListItemIcon, {
        children: /*#__PURE__*/_jsx(rootProps.slots.columnMenuUngroupIcon, {
          fontSize: "small"
        })
      }), /*#__PURE__*/_jsx(ListItemText, {
        children: apiRef.current.getLocaleText('unGroupColumn')(name)
      })]
    }, field);
  };
  if (!colDef || !isGroupingColumn(colDef.field)) {
    return null;
  }
  if (colDef.field === GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD) {
    return /*#__PURE__*/_jsx(React.Fragment, {
      children: rowGroupingModel.map(renderUnGroupingMenuItem)
    });
  }
  return renderUnGroupingMenuItem(getRowGroupingCriteriaFromGroupingField(colDef.field));
}