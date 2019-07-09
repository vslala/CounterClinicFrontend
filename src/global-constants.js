import { makeStyles } from '@material-ui/core/styles';

export const BASE_URL = "http://localhost:8080";
export const MOCKED_BASE_URL = "http://demo3881522.mockable.io";

export const LOCAL_DATE_FORMAT = "YYYY-MM-DD";
export const LOCAL_TIME_FORMAT = "hh:mm:ss";
export const LOCAL_DATE_TIME_FORMAT = LOCAL_DATE_FORMAT + ' ' + LOCAL_TIME_FORMAT;

export const TOP_MARGIN = 50;
export const LEFT_PADDING = 25;

export const RECEPTIONIST = "RECEPTIONIST";
export const DOCTOR = "DOCTOR";
export const ADMIN = "ADMIN";
export const SUPER_ADMIN = "SUPER_ADMIN";
export const PATIENT = "PATIENT";

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

export const handleErrors = (response) => {
  if (! response.ok) {
    throw response;
  }
  return response;
}