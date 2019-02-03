import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

export const theme = createMuiTheme({
  palette: {
    primary: { main: grey[900] },
    secondary: { main: grey[700] },
  },
});
