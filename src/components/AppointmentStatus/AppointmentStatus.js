import React, { useState, useEffect } from 'react';
import { Paper, Button, Table, TableRow, TableCell, TableHead, TableBody, Typography } from '@material-ui/core';
import * as globalconstants from '../../global-constants';
import SockJs from 'sockjs-client';
import Stomp from 'stompjs';
import Clock from 'react-live-clock';
import store from '../../store';
import { setLatestAppointmentStatus } from '../../actions';

export default function AppointmentStatus() {

    const classes = globalconstants.useStyles();
    const [connected, setConnected] = useState(false);
    const [appointmentStatus, setAppointmentStatus] = useState({});

    const fetchAppointmentStatus = () => {
        fetch(globalconstants.API.fetchLatestAppointmentStatusUrl)
        .then( (response) => response.json())
        .then( (appointmentStatus) => {
            console.log("Appointment Status")
            console.log(appointmentStatus);
            setAppointmentStatus(appointmentStatus);
            store.dispatch(setLatestAppointmentStatus(appointmentStatus));
        })
    }

    const connect = () => {
        var socket = new SockJs(globalconstants.API.websocketUrl);
        var stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame) => {
            setConnected(true);
            console.log("Connected: "  + frame);
            stompClient.subscribe('/topic/appointment-status', (response) => {
                console.log("Received from websocket");
                let appointmentStatus = JSON.parse(response.body);
                console.log(appointmentStatus);
                setAppointmentStatus(appointmentStatus);
            });
        }, (message) => {
            // on disconnect
            console.log(message);
            setConnected(false);
        });
    }

    useEffect( () => {
        fetchAppointmentStatus();
        connect();
    }, []);

    if (! connected) {
        return (
            <div style={{marginLeft: 50}}>
                <Paper className={classes.root}>
                    <Button variant="outlined" onClick={() => connect()}>
                        Connect!
                    </Button>
                </Paper>
            </div>
        );
    }

    function convertToLocalDate(datetime) {
        if (!datetime)
            return '';
        let formattedDate = datetime.replace(' ', 'T') + '.000Z';
        console.log("Formatted Date: " + formattedDate);
        let date = new Date(formattedDate);
        let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        return time;
    }


    return (
        <Paper className={classes.root}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h5">Queue Status</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="left">Appointment Status ID</TableCell>
                        <TableCell align="center">{appointmentStatus.appointmentStatusId}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Current Appointment ID</TableCell>
                        <TableCell align="center">{appointmentStatus.currentAppointmentId}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Average Waiting Time of Queue</TableCell>
                        <TableCell align="center">{appointmentStatus.avgWaitingTime}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Current Appointment Start Time</TableCell>
                        <TableCell align="center">{convertToLocalDate(appointmentStatus.appointmentStartTimeFormatted)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Doctor Break Duration</TableCell>
                        <TableCell align="center">{appointmentStatus.doctorBreakDuration}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Appointments Completed Today</TableCell>
                        <TableCell align="center">{appointmentStatus.patientsInVisitedQueue}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Appointment Time</TableCell>
                        <TableCell align="center">
                            <Clock format={'HH:mm:ss'} ticking={true} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
}