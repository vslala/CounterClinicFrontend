import * as Type from '../actions/constants';

export default (state, action) => {
    console.log(action);

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

    return state;
}