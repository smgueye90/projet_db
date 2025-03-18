"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridExcelExportMenuItem = GridExcelExportMenuItem;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _useGridApiContext = require("../hooks/utils/useGridApiContext");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["hideMenu", "options"];
function GridExcelExportMenuItem(props) {
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const {
      hideMenu,
      options
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItem.default, (0, _extends2.default)({
    onClick: () => {
      apiRef.current.exportDataAsExcel(options);
      hideMenu?.();
    }
  }, other, {
    children: apiRef.current.getLocaleText('toolbarExportExcel')
  }));
}
process.env.NODE_ENV !== "production" ? GridExcelExportMenuItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  hideMenu: _propTypes.default.func,
  options: _propTypes.default.shape({
    allColumns: _propTypes.default.bool,
    columnsStyles: _propTypes.default.object,
    disableToolbarButton: _propTypes.default.bool,
    escapeFormulas: _propTypes.default.bool,
    exceljsPostProcess: _propTypes.default.func,
    exceljsPreProcess: _propTypes.default.func,
    fields: _propTypes.default.arrayOf(_propTypes.default.string),
    fileName: _propTypes.default.string,
    getRowsToExport: _propTypes.default.func,
    includeColumnGroupsHeaders: _propTypes.default.bool,
    includeHeaders: _propTypes.default.bool,
    valueOptionsSheetName: _propTypes.default.string,
    worker: _propTypes.default.func
  })
} : void 0;