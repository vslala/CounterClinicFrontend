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

    const refreshAppointmentStatus = () => {
        fetchAppointmentInfo().then((appointmentInfo) => {
            if (moment().isAfter(moment(appointmentInfo.walkInAppointment.createdAt, globalconstants.LOCAL_DATE_TIME_FORMAT), 'day')) {
                setDisplay({
                    error: true,
                    errorMessage: <Typography variant="h5">Your appointment has passed!</Typography>
                });
                return;
            }
            setAppointmentInfo(appointmentInfo);

            fetchAppointmentStatus()
            .then((appointmentStatus) => {
                setAppointmentStatus(appointmentStatus);
                if (!appointmentStatus.appointmentStartTime) {
                    setDisplay({
                        show: false,
                        item: <Typography variant="h5">Doctor has not yet started taking patients.</Typography>
                    });
                    return;
                }
                calculateDisplay(appointmentInfo, appointmentStatus);
            })
        })
        .catch(error => {
            console.log("Encountered Error: ", error);
            setDisplay({
                error: true,
                errorMessage: <Typography variant="h5">Invalid Appointment!</Typography>
            })
        })
    }
    

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
                    refreshAppointmentStatus();
                }
            });
        }, (message) => {
            // on disconnect
            console.log(message);
            setConnected(false);
        });
    }

    const fetchAppointmentInfo = () => {
        return new Promise((resolve, reject) => {
            globalconstants.fetcher.fetchAppointmentInfo(appointmentId)
            .then(appointmentInfo => {
                console.log("Appointment Info: ", appointmentInfo);
                setAppointmentInfo(appointmentInfo);
                resolve(appointmentInfo);
            })
            .catch(error => {
                console.log("Encountered Error: ", error);
                reject(error);
            });
        })
        
    }

    

    const fetchAppointmentStatus = () => {
        return new Promise((resolve, reject) => {
            console.log("Fetching appointment status from the backend.");
            globalconstants.fetcher.fetchLatestAppointmentStatus(doctorId)
            .then(appointmentStatus => {
                console.log("Appointment Status: ", appointmentStatus);
                setAppointmentStatus(appointmentStatus);
                resolve(appointmentStatus);
            })
            .catch(error => {
                console.log("Encountered Error while fetching appointment status: ", error);
                reject(error);
            })
        })
        
    }

    var timeRemaining = 15*60000;
    const [approxTimeRemaining, setApproxTimeRemaining] = useState(timeRemaining);
    const [display, setDisplay] = useState({
        show: false,
        item: <Typography variant="h5">Doctor has not yet started taking patients.</Typography>,
        error: false,
        errorMessage: null
    });

    const handleClockTick = () => {
        timeRemaining -= 1000;
        if (timeRemaining < appointmentStatus.avgWaitingTime * 60 * 1000) {
            timeRemaining += 5 * 60 * 1000 ; // increase time by 5 minutes;
        }
    }

    const calculateDisplay = (appointmentInfo, appointmentStatus) => {
        let patientsLeft = appointmentInfo.walkInAppointment.appointmentNumber - appointmentStatus.patientsInVisitedQueue;
        if (patientsLeft < 2) {
            setDisplay({
                show: true,
                item: <Typography variant="h5">Get Ready, You are Next!</Typography>,
                error:false
            });
            return;
        }

        console.log(`avg waiting time: ${appointmentStatus.avgWaitingTime}, patients left: ${patientsLeft}`);
        timeRemaining = appointmentStatus.avgWaitingTime == 0 ? 15*60*1000 : (appointmentStatus.avgWaitingTime * patientsLeft) * 60 * 1000;
        setDisplay({
            show: true,
            item: null,
            error: false
        });
        setApproxTimeRemaining(timeRemaining);
    }

    useEffect(() => {
        connectClinicBackend();
        refreshAppointmentStatus();
        
    }, []);

    
    
    if (! urlParams.has("doctorId") || ! urlParams.has("appointmentId")) {
        return errorBox;
    }


    return (
        <div>
            {
                display.error ? display.errorMessage : (
                    <Grid justify="center" alignItems="center" container>
                        <PatientAppointmentStatus appointmentInfo={{
                            appointmentNumber: appointmentInfo.walkInAppointment.appointmentNumber,
                            patientsInVisitedQueue: appointmentStatus.patientsInVisitedQueue ? appointmentStatus.patientsInVisitedQueue : 0,
                            doctorName: appointmentInfo.appointedDoctor.fullName,
                            appointmentStartTimeFormatted: appointmentStatus.appointmentStartTimeFormatted ? moment.utc(appointmentStatus.appointmentStartTimeFormatted, globalconstants.LOCAL_DATE_TIME_FORMAT)
                                .local().format(globalconstants.LOCAL_TIME_FORMAT) : '--',
                        }} 
                        handleTick={handleClockTick}
                        approxTimeRemaining={approxTimeRemaining}
                        display={display}
                        />
                    </Grid>
                )
            }
        </div>
    );
}

export default PatientWalkInAppointmentStatus;