import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxPromise from 'redux-promise';

const logger = createLogger();
const initialState = {
    appointments: [],
    newWalkInAppointment: {
        patientFirstName: '',
        patientLastName: '',
        doctorId: 0
    },
    latestAppointmentStatus: {},
    qrCode: {},
    // loggedInUser: {},
    loggedInUser: {
        "userId": 21,
        "firstName": "Reception",
        "lastName": "Worker",
        "email": "pvrano@gmail.com",
        "mobile": "7773456789",
        "username": "reception",
        "preferredLanguage": "ENGLISH",
        "roles": [
            "DOCTOR"
        ],
        "fullName": "Priyanka Yadav"
    }
};
const store = createStore(reducer, initialState, composeWithDevTools(
    applyMiddleware(ReduxPromise, logger),
));

export default store;