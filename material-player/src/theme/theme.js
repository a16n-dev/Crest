import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import palette from './palette'
import overrides from './override'
const themeDef = {
  palette,
  overrides
} 
let theme = createMuiTheme(themeDef)
theme = responsiveFontSizes(theme);
export default theme;