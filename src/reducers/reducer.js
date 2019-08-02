import * as Type from '../actions/constants';

export default (state, action) => {
    console.log(action);

    if (action.type === Type.SET_LOGGED_IN_USER) {
        return {
            ...state,
            loggedInUser: action.payload
        };
    }

    if (action.type === Type.SET_APPOINTMENTS) {
        return {
            ...state,
            appointments: action.payload.walkInAppointmentList
        }
    }

    if (action.type === Type.CREATE_NEW_APPOINTMENT) {
        let appointments = state.appointments;
        return {
            ...state,
            appointments: [action.payload, ...appointments]
        };
    }

    if (action.type === Type.CREATE_NEW_QR_CODE) {
        return {
            ...state,
            qrCode: action.payload
        }
    }

    if (action.type === Type.LATEST_APPOINTMENT_STATUS) {
        return {
            ...state,
            latestAppointmentStatus: action.payload
        }
    }


    return state;
}