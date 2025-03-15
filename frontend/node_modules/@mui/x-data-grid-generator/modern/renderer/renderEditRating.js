import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useGridApiContext } from '@mui/x-data-grid-premium';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function EditRating(props) {
  const {
    id,
    value,
    field
  } = props;
  const apiRef = useGridApiContext();
  const changedThroughKeyboard = React.useRef(false);
  const handleChange = async event => {
    await apiRef.current.setEditCellValue({
      id,
      field,
      value: Number(event.target.value)
    }, event);
    if (!changedThroughKeyboard.current) {
      apiRef.current.stopCellEditMode({
        id,
        field
      });
    }
    changedThroughKeyboard.current = false;
  };
  const handleRef = element => {
    if (element) {
      if (value !== 0) {
        element.querySelector(`input[value="${value}"]`).focus();
      } else {
        element.querySelector('input[value=""]').focus();
      }
    }
  };
  const handleKeyDown = event => {
    if (event.key.startsWith('Arrow')) {
      changedThroughKeyboard.current = true;
    } else {
      changedThroughKeyboard.current = false;
    }
  };
  return /*#__PURE__*/_jsxs(Box, {
    sx: {
      display: 'flex',
      alignItems: 'center',
      lineHeight: '24px',
      color: 'text.secondary',
      mr: 1
    },
    children: [/*#__PURE__*/_jsx(Rating, {
      ref: handleRef,
      name: "rating",
      value: Number(value),
      precision: 1,
      onChange: handleChange,
      sx: {
        mr: 1
      },
      onKeyDown: handleKeyDown
    }), Number(value)]
  });
}
export function renderEditRating(params) {
  return /*#__PURE__*/_jsx(EditRating, _extends({}, params));
}