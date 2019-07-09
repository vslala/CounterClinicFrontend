import * as Type from "./constants";

export function setLoggedInUser(loggedInUser) {
    return {
        type: Type.SET_LOGGED_IN_USER,
        payload: loggedInUser
    }
}

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

export function createNewQRCode(qrCode) {
    return {
        type: Type.CREATE_NEW_QR_CODE,
        payload: qrCode
    }
}

export function setLatestAppointmentStatus(appointmentStatus) {
    return {
        type: Type.LATEST_APPOINTMENT_STATUS,
        payload: appointmentStatus
    }
}