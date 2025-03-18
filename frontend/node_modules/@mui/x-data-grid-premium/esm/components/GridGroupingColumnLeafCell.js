import * as React from 'react';
import Box from '@mui/material/Box';
import { useGridRootProps } from "../hooks/utils/useGridRootProps.js";
import { jsx as _jsx } from "react/jsx-runtime";
function GridGroupingColumnLeafCell(props) {
  const {
    rowNode
  } = props;
  const rootProps = useGridRootProps();
  return /*#__PURE__*/_jsx(Box, {
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
export { GridGroupingColumnLeafCell };