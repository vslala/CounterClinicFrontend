import { makeStyles } from '@material-ui/core/styles';

export const BASE_URL = "http://localhost:8080";

export const TOP_MARGIN = 50;
export const LEFT_PADDING = 25;

export const RECEPTIONIST = "RECEPTIONIST";
export const DOCTOR = "DOCTOR";

export const useStyles = makeStyles(theme => ({
    root: {
      width: '90%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
}));