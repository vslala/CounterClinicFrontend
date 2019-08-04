import { makeStyles } from '@material-ui/core/styles';

export const ONLINE_APPOINTMENT_API = "http://206.189.30.73:8081";
export const BASE_URL = "http://localhost:8080";
export const MOCKED_BASE_URL = "http://demo3881522.mockable.io";
export const API = {
  loginUrl: ONLINE_APPOINTMENT_API + '/api/v1/users/login', // POST
  registerUrl: ONLINE_APPOINTMENT_API + '/api/v1/users/register', // POST

  online: {
    fetchAllAppointmentsUrl: ONLINE_APPOINTMENT_API + '/api/v1/appointments',
  },

  updateSettingUrl: BASE_URL + '/user/setting', // POST
  fetchSettingsUrl: BASE_URL + '/user/settings', // GET
  deleteSettingUrl: BASE_URL + '/user/setting/delete',

  // fetch users by role
  fetchAllDoctors: BASE_URL + '/user/all/doctor', // GET
  fetchAllReceptionists: BASE_URL + '/user/all/receptionist', // GET
  fetchAllAdmins: BASE_URL + '/user/all/admin', // GET
  fetchAllSuperAdmins: BASE_URL + '/user/all/super_admin', // GET
  fetchAllPatients: BASE_URL + '/user/all/patient', // GET

  fetchDoctorSlots: ONLINE_APPOINTMENT_API + '/api/v1/appointments/doctors/availableSlots', // GET

  createNewAppointmentUrl: BASE_URL  + '/walk-in-appointment/create-appointment', // POST

  fetchQrCodeByAppointmentIdUrl: BASE_URL + '/walk-in-appointment/qrcode', // GET
  fetchLatestAppointmentStatusUrl: BASE_URL + '/walk-in-appointment/appointment-status/latest', // GET
  fetchAllAppointmentsUrl: BASE_URL + '/walk-in-appointment/all', // GET
  fetchAppointmentByIdUrl: BASE_URL + '/walk-in-appointment/wrapped/id', // GET
  fetchAppointmentStatus: BASE_URL + '/walk-in-appointment/appointment-status', // GET

  websocketUrl: BASE_URL + '/gs-guide-websocket',

  fetchAllClinics: BASE_URL + '/clinic/all', // GET
};

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

export const ACCESS_TOKEN = "accessToken";
export const LOGGED_IN_USER = "loggedInUser";

export const attachmentType = {
  siteLogo: 'siteLogo',
  adImage: 'adImage'
};

export const userRoles = [RECEPTIONIST, DOCTOR, ADMIN, SUPER_ADMIN, PATIENT];

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

export const accessToken = () => {
  let accessToken = localStorage.getItem(ACCESS_TOKEN);
  return accessToken;
}

export const handleErrors = (response) => {
  if (! response.ok) {
    throw response.json();
  }
  return response;
}

export const fetcher = {
  fetchAppointmentInfo: (appointmentId) => {
    return new Promise((resolve, reject) => {
      fetch(`${API.fetchAppointmentByIdUrl}/${appointmentId}`)
      .then(handleErrors)
      .then(response => response.json())
      .then(appointmentInfo => {
        resolve(appointmentInfo);
      })
      .catch(error => {
        reject(error);
      })
    });
  },

  fetchAppointmentStatus: (appointmentId, doctorId) => {
    return new Promise((resolve, reject) => {

      fetch(`${API.fetchAppointmentStatus}?doctorId=${doctorId}&appointmentId=${appointmentId}`)
      .then(handleErrors)
      .then(response => response.json())
      .then(appointmentStatus => resolve(appointmentStatus))
      .catch(error => {
        reject(error);
      })

    });
  }
}