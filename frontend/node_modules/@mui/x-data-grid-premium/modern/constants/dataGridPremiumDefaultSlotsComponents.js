import _extends from "@babel/runtime/helpers/esm/extends";
import { DATA_GRID_PRO_DEFAULT_SLOTS_COMPONENTS } from '@mui/x-data-grid-pro/internals';
import { GridPremiumColumnMenu } from "../components/GridPremiumColumnMenu.js";
import materialSlots from "../material/index.js";
export const DATA_GRID_PREMIUM_DEFAULT_SLOTS_COMPONENTS = _extends({}, DATA_GRID_PRO_DEFAULT_SLOTS_COMPONENTS, materialSlots, {
  columnMenu: GridPremiumColumnMenu
});