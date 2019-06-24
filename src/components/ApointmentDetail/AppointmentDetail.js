import React, { useState, useEffect } from "react";
import { Typography, Paper, List, ListItem, Grid, CircularProgress } from "@material-ui/core";
import * as globalconstants from '../../global-constants';

export default function AppointmentDetail(props) {

    const [appointmentWrapper, setAppointmentWrapper] = useState({})

    const fetchAppointment = (appointmentId) => {
        fetch(globalconstants.BASE_URL + '/walk-in-appointment/wrapped/id/' + appointmentId)
        .then( (response) => response.json() )
        .then( (data) => {
            console.log("Appointment Info");
            console.log(data);
            setAppointmentWrapper(data);
        });
    }

    useEffect(() => {
        setTimeout(fetchAppointment(props.appointmentId), 3000);
    }, [])

    if (! appointmentWrapper.qrCode) 
        return (
            <Paper>
                <CircularProgress/>
            </Paper>
        );
    return (
        <Paper style={{textAlign: "center"}}>
            <List style={{width: 400}}>
                <ListItem key={1}>
                    <img src={globalconstants.BASE_URL + '/' + appointmentWrapper.qrCode.qrCodeUrlPath} />
                </ListItem>
                <ListItem key={2}>
                    <Grid item xs={4}>
                        <Typography align="right" variant="body1">Full Name</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography align="right" variant="body1">{appointmentWrapper.walkInAppointment.patientFullName}</Typography>
                    </Grid>
                </ListItem>
                <ListItem key={3}>
                    <Grid item xs={5}>
                        <Typography align="right" variant="body1">Appointed Doctor</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography align="right" variant="body1">{appointmentWrapper.appointedDoctor.fullName}</Typography>
                    </Grid>
                </ListItem>
                <ListItem key={4}>
                    <Grid item xs={4}>
                        <Typography align="right" variant="body1">Created At</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography align="right" variant="body1">{appointmentWrapper.walkInAppointment.createdAt}</Typography>
                    </Grid>
                </ListItem>
                <ListItem key={5}>
                    <Grid item xs={4}>
                        <Typography align="right" variant="body1">Clinic Room Id</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography align="right" variant="body1">{appointmentWrapper.appointedDoctor.clinicRoomId}</Typography>
                    </Grid>
                </ListItem>
            </List>
        </Paper>
    );
}