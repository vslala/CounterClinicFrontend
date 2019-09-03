import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Divider, Grid, List, ListItem, Paper, Typography} from '@material-ui/core';
import uuidv4 from 'uuid/v4';
import Countdown from 'react-countdown-now';

function PatientAppointmentStatus(props) {

    const { appointmentInfo, display, approxTimeRemaining, handleTick } = props;

    console.log(`appointmentInfo: ${appointmentInfo}, display: ${display.show}, approxTimeRemaining: ${approxTimeRemaining}`);

    const [timeRemaining, setTimeRemaining] = useState(approxTimeRemaining);

    useEffect(() => {
        setTimeRemaining(approxTimeRemaining);
    }, []);

    const displayTimeRemaining = (hours, minutes, seconds) => (
        <List style={{minWidth: 400}}>
            <ListItem key={uuidv4()}>
                <Grid item xs={4}>
                    <Typography align="right" variant="body1">Hours</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography align="right" variant="body1">{hours}</Typography>
                </Grid>
            </ListItem>
            <ListItem key={uuidv4()}>
                <Grid item xs={4}>
                    <Typography align="right" variant="body1">Minutes</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography align="right" variant="body1">{minutes}</Typography>
                </Grid>
            </ListItem>
            <ListItem key={uuidv4()}>
                <Grid item xs={4}>
                    <Typography align="right" variant="body1">Seconds</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography align="right" variant="body1">{seconds}</Typography>
                </Grid>
            </ListItem>
        </List>
    );

    return (
        <div>
            <Paper style={{padding: 10}}>
                <Grid container justify="center" alignItems="center">
                    <Typography variant="h4">Appointment Status</Typography>
                    <Divider style={{borderBottom: 1}}/>
                </Grid>
                <List style={{minWidth: 300}}>
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
                </List>
            </Paper>
            {/* Countdown timer starts here */}
            <Divider />
            <Paper style={{marginTop: 10, padding: 10}}>
                <Grid container justify="center" alignItems="center">
                    {
                        display.show ? (
                            [
                            <Grid key={uuidv4()} item xs={12}>
                                <Typography variant="h5">Time Remaining</Typography>
                                <Divider />
                            </Grid>,
                            <Countdown 
                                key={uuidv4()}
                                date={Date.now() + approxTimeRemaining}
                                onTick={handleTick}
                                renderer={({hours, minutes, seconds, completed}) => {
                                    return displayTimeRemaining(hours, minutes, seconds);
                                }}
                            />
                            ]
                        ) : display.item
                    }
                    
                </Grid>
            </Paper>
        </div>
    );
}

PatientAppointmentStatus.propTypes = {
    appointmentInfo: PropTypes.object.isRequired,
    display: PropTypes.object.isRequired,
    approxTimeRemaining: PropTypes.number.isRequired,
    handleTick: PropTypes.func.isRequired
}


export default PatientAppointmentStatus;


