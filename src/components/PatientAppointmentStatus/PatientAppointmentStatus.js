import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { handleErrors } from '../../global-constants';
import { Paper, Grid, Typography, List, ListItem, Divider } from '@material-ui/core';
import uuidv4  from 'uuid/v4';

function PatientAppointmentStatus(props) {

    const { appointmentInfo } = props;

    useEffect(() => {

    }, []);

    return (
        <Paper>
            <List style={{minWidth: 600}}>
                <ListItem key={uuidv4()}>
                    <Grid item xs={4}>
                        <Typography align="right" variant="body1">Your Number</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography align="right" variant="body1">{appointmentInfo.appointmentNumber}</Typography>
                    </Grid>
                </ListItem>
                <ListItem key={uuidv4()}>
                    <Grid item xs={4}>
                        <Typography align="right" variant="body1">Patient's Visited</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography align="right" variant="body1">{appointmentInfo.patientsInVisitedQueue}</Typography>
                    </Grid>
                </ListItem>
                <ListItem key={uuidv4()}>
                    <Grid item xs={4}>
                        <Typography align="right" variant="body1">Doctor Name</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography align="right" variant="body1">{appointmentInfo.doctorName}</Typography>
                    </Grid>
                    <Divider />
                </ListItem>
                <ListItem key={uuidv4()}>
                    <Grid item xs={4}>
                        <Typography align="right" variant="body1">Last Patient In-Time</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography align="right" variant="body1">{appointmentInfo.appointmentStartTimeFormatted}</Typography>
                    </Grid>
                </ListItem>
                <ListItem key={uuidv4()}>
                    <Grid item xs={12}>
                        <Typography align="center" variant="h4">Last Patient In-Time</Typography>
                    </Grid>
                </ListItem>
            </List>
        </Paper>
    );
}

PatientAppointmentStatus.propTypes = {
    appointmentInfo: PropTypes.object.isRequired
}


export default PatientAppointmentStatus;


