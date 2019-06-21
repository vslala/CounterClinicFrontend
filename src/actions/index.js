import * as Type from "./constants";

export function setAppointments(appointments) {
    return {
        type: Type.SET_APPOINTMENTS,
        payload: appointments
    };
}

export function createNewAppointment(appointment) {
    return {
        type: Type.CREATE_NEW_APPOINTMENT,
        payload: appointment
    }
}