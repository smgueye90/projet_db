"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridFooterCell = GridFooterCell;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _xDataGrid = require("@mui/x-data-grid");
var _styles = require("@mui/material/styles");
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _useGridRootProps = require("../hooks/utils/useGridRootProps");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["formattedValue", "colDef", "cellMode", "row", "api", "id", "value", "rowNode", "field", "focusElementRef", "hasFocus", "tabIndex", "isEditable"];
const GridFooterCellRoot = (0, _styles.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'FooterCell',
  overridesResolver: (_, styles) => styles.footerCell
})(({
  theme
}) => ({
  fontWeight: theme.typography.fontWeightMedium,
  color: (theme.vars || theme).palette.primary.dark
}));
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['footerCell']
  };
  return (0, _composeClasses.default)(slots, _xDataGrid.getDataGridUtilityClass, classes);
};
function GridFooterCell(props) {
  const {
      formattedValue
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const ownerState = rootProps;
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(GridFooterCellRoot, (0, _extends2.default)({
    ownerState: ownerState,
    className: classes.root
  }, other, {
    children: formattedValue
  }));
}