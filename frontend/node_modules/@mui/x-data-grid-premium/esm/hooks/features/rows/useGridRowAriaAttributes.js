import { useGridRowAriaAttributes as useGridRowAriaAttributesPro, useGridSelector } from '@mui/x-data-grid-pro/internals';
import { useGridPrivateApiContext } from "../../utils/useGridPrivateApiContext.js";
import { gridRowGroupingSanitizedModelSelector } from "../rowGrouping/gridRowGroupingSelector.js";
export const useGridRowAriaAttributes = () => {
  const apiRef = useGridPrivateApiContext();
  const gridRowGroupingModel = useGridSelector(apiRef, gridRowGroupingSanitizedModelSelector);
  return useGridRowAriaAttributesPro(gridRowGroupingModel.length > 0);
};