import React, { useState, useEffect } from 'react';
import { Paper, Button, Box, Grid, Table, TableRow, TableCell, TableHead, TableBody, Typography } from '@material-ui/core';
import * as globalconstants from '../../global-constants';
import SockJs from 'sockjs-client';
import Stomp from 'stompjs';

export default function AppointmentStatus() {

    const classes = globalconstants.useStyles();
    const [connected, setConnected] = useState(false);
    const [appointmentStatus, setAppointmentStatus] = useState({});

    const fetchAppointmentStatus = () => {
        fetch(globalconstants.BASE_URL + '/walk-in-appointment/appointment-status/latest')
        .then( (response) => response.json())
        .then( (appointmentStatus) => {
            console.log("Appointment Status")
            setAppointmentStatus(appointmentStatus);
        })
    }

    const connect = () => {
        var socket = new SockJs(globalconstants.BASE_URL + '/gs-guide-websocket');
        var stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame) => {
            setConnected(true);
            console.log("Connected: "  + frame);
            stompClient.subscribe('/topic/appointment-status', (appointmentStatus) => {
                console.log("Received from websocket");
                console.log(appointmentStatus);
                setAppointmentStatus(appointmentStatus);
            });
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
                    <Button variant="outlined" onClick={() => setConnected(true)}>
                        Connect!
                    </Button>
                </Paper>
            </div>
        );
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
                        <TableCell align="center">{appointmentStatus.appointmentStartTimeFormatted}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Doctor Break Duration</TableCell>
                        <TableCell align="center">{appointmentStatus.doctorBreakDuration}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Appointments Completed Today</TableCell>
                        <TableCell align="center">{appointmentStatus.patientsInVisitedQueue}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
}