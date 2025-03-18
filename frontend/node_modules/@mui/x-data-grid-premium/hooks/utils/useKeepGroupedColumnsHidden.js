"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useKeepGroupedColumnsHidden = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _xDataGridPro = require("@mui/x-data-grid-pro");
const updateColumnVisibilityModel = (columnVisibilityModel, rowGroupingModel, prevRowGroupingModel) => {
  const newColumnVisibilityModel = (0, _extends2.default)({}, columnVisibilityModel);
  rowGroupingModel?.forEach(field => {
    if (!prevRowGroupingModel?.includes(field)) {
      newColumnVisibilityModel[field] = false;
    }
  });
  prevRowGroupingModel?.forEach(field => {
    if (!rowGroupingModel?.includes(field)) {
      newColumnVisibilityModel[field] = true;
    }
  });
  return newColumnVisibilityModel;
};

/**
 * Automatically hide columns when added to the row grouping model and stop hiding them when they are removed.
 * Handles both the `props.initialState.rowGrouping.model` and `props.rowGroupingModel`
 * Does not work when used with the `hide` property of `GridColDef`
 */
const useKeepGroupedColumnsHidden = props => {
  const initialProps = React.useRef(props);
  const rowGroupingModel = React.useRef(props.rowGroupingModel ?? props.initialState?.rowGrouping?.model);
  React.useEffect(() => {
    props.apiRef.current.subscribeEvent('rowGroupingModelChange', newModel => {
      const columnVisibilityModel = updateColumnVisibilityModel((0, _xDataGridPro.gridColumnVisibilityModelSelector)(props.apiRef), newModel, rowGroupingModel.current);
      props.apiRef.current.setColumnVisibilityModel(columnVisibilityModel);
      rowGroupingModel.current = newModel;
    });
  }, [props.apiRef]);
  return React.useMemo(() => {
    const invariantInitialState = initialProps.current.initialState;
    const columnVisibilityModel = updateColumnVisibilityModel(invariantInitialState?.columns?.columnVisibilityModel, rowGroupingModel.current, undefined);
    return (0, _extends2.default)({}, invariantInitialState, {
      columns: (0, _extends2.default)({}, invariantInitialState?.columns, {
        columnVisibilityModel
      })
    });
  }, []);
};
exports.useKeepGroupedColumnsHidden = useKeepGroupedColumnsHidden;