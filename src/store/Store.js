import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';

const logger = createLogger();
const initialState = {
    appointments: [],
    newWalkInAppointment: {
        patientFirstName: '',
        patientLastName: '',
        doctorId: 0
    },
    qrCode: {},
    loggedInUser: {
        "userId": 2,
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
const store = createStore(reducer, initialState, applyMiddleware(logger));

export default store;