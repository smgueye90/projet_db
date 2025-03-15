import _extends from "@babel/runtime/helpers/esm/extends";
import { useGridAriaAttributes as useGridAriaAttributesPro, useGridSelector } from '@mui/x-data-grid-pro/internals';
import { gridRowGroupingSanitizedModelSelector } from "../features/rowGrouping/gridRowGroupingSelector.js";
import { useGridPrivateApiContext } from "./useGridPrivateApiContext.js";
import { useGridRootProps } from "./useGridRootProps.js";
export const useGridAriaAttributes = () => {
  const rootProps = useGridRootProps();
  const ariaAttributesPro = useGridAriaAttributesPro();
  const apiRef = useGridPrivateApiContext();
  const gridRowGroupingModel = useGridSelector(apiRef, gridRowGroupingSanitizedModelSelector);
  const ariaAttributesPremium = rootProps.experimentalFeatures?.ariaV8 && gridRowGroupingModel.length > 0 ? {
    role: 'treegrid'
  } : {};
  return _extends({}, ariaAttributesPro, ariaAttributesPremium);
};