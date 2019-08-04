import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Paper, Typography, Grid } from '@material-ui/core';
import SockJs from 'sockjs-client';
import Stomp from 'stompjs';
import * as globalconstants from '../../global-constants';
import PatientAppointmentStatus from '../../components/PatientAppointmentStatus/PatientAppointmentStatus';
import moment from 'moment';

function PatientWalkInAppointmentStatus(props) {

    var urlParams = new URLSearchParams(window.location.search);
    var doctorId = urlParams.get('doctorId');
    var appointmentId = urlParams.get('appointmentId');

    const errorBox = (
        <Grid container justify="center" alignItems="center">
            <Paper style={{maxWidth: 600}}>
                <Typography variant="h5">Doctor and Appointment ID must be selected.</Typography>
            </Paper>
        </Grid>
    );

    const [connected, setConnected] = useState(false);
    const [appointmentInfo, setAppointmentInfo] = useState({
        appointedDoctor: {},
        appointmentStatus: {},
        qrCode: {},
        walkInAppointment: {}
    });
    const [appointmentStatus, setAppointmentStatus] = useState({

    });
    

    const connectClinicBackend = () => {
        
        var socket = new SockJs(globalconstants.API.websocketUrl);
        var stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame) => {
            setConnected(true);
            console.log("Connected: "  + frame);
            stompClient.subscribe('/topic/appointment-status', (response) => {
                console.log("Received from websocket");
                let appointmentStatusResponse = JSON.parse(response.body);
                console.log(appointmentStatusResponse);
                if (doctorId == appointmentStatusResponse.doctorId) {
                    fetchAppointmentStatus();
                }
            });
        }, (message) => {
            // on disconnect
            console.log(message);
            setConnected(false);
        });
    }

    const fetchAppointmentInfo = () => {
        globalconstants.fetcher.fetchAppointmentInfo(appointmentId)
        .then(appointmentInfo => {
            console.log("Appointment Info: ", appointmentInfo);
            setAppointmentInfo(appointmentInfo);
        })
        .catch(error => {
            console.log("Encountered Error: ", error);
        })
    }

    const fetchAppointmentStatus = () => {
        globalconstants.fetcher.fetchAppointmentStatus(appointmentId, doctorId)
        .then(appointmentStatus => {
            console.log("Appointment Status: ", appointmentStatus);
            setAppointmentStatus(appointmentStatus);
        })
        .catch(error => {
            console.log("Encountered Error while fetching appointment status: ", error);
        })
    }

    useEffect(() => {
        connectClinicBackend();
        fetchAppointmentInfo();
        fetchAppointmentStatus();
    }, []);

    
    if (! urlParams.has("doctorId") || ! urlParams.has("appointmentId")) {
        return errorBox;
    }


    return (
        <div>
            <Grid justify="center" alignItems="center" container>
                <PatientAppointmentStatus appointmentInfo={{
                    appointmentNumber: appointmentInfo.walkInAppointment.appointmentNumber,
                    patientsInVisitedQueue: appointmentStatus.patientsInVisitedQueue,
                    doctorName: appointmentInfo.appointedDoctor.fullName,
                    appointmentStartTimeFormatted: moment.utc(appointmentStatus.appointmentStartTimeFormatted, globalconstants.LOCAL_DATE_TIME_FORMAT)
                        .local().format(globalconstants.LOCAL_TIME_FORMAT),
                    avgWaitingTime: appointmentStatus.avgWaitingTime,
                    patientsLeft: (appointmentInfo.walkInAppointment.appointmentNumber - appointmentStatus.patientsInVisitedQueue)
                }} />
            </Grid>
        </div>
    );
}

export default PatientWalkInAppointmentStatus;