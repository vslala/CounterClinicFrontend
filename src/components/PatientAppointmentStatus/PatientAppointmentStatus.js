import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { handleErrors } from '../../global-constants';
import { Paper, Grid, Typography, List, ListItem, Divider } from '@material-ui/core';
import uuidv4  from 'uuid/v4';
import Countdown from 'react-countdown-now';

function PatientAppointmentStatus(props) {

    const { appointmentInfo } = props;

    const [timeRemaining, setTimeRemaining] = useState(15*60*1000)

    useEffect(() => {

    }, []);

    return (
        <div>
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
                </List>
            </Paper>
            <Paper>
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={12}>
                        <Typography variant="h5">Time Remaining</Typography>
                        <Divider />
                    </Grid>
            
                    <Countdown 
                        date={Date.now() + timeRemaining}
                        onTick={() => {
                            // write the logic to update the renderer view
                        }}
                        renderer={({hours, minutes, seconds, completed}) => {
                            return (
                                <List style={{minWidth: 400}}>
                                    <ListItem key={uuidv4()}>
                                        <Grid item xs={4}>
                                            <Typography align="right" variant="body1">Hours</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography align="right" variant="body1">{hours}</Typography>
                                        </Grid>
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
                                    </ListItem>
                                    
                                </List>
                            );
                        }}
                    />
                </Grid>
            </Paper>
        </div>
    );
}

PatientAppointmentStatus.propTypes = {
    appointmentInfo: PropTypes.object.isRequired,
    patientsLeft: PropTypes.number.isRequired,
    avgWaitingTime: PropTypes.number.isRequired
}


export default PatientAppointmentStatus;


