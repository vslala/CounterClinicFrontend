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
    qrCode: {}
};
const store = createStore(reducer, initialState, applyMiddleware(logger));

export default store;