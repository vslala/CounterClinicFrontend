import React, { useState } from 'react';
import { FormControl, TextField, FormLabel, Button, Paper, Typography } from '@material-ui/core';
import * as globalconstants from '../../global-constants';
import AlertDialog from '../AlertDialog';
import AppointmentStatus from '../AppointmentStatus/AppointmentStatus';

export default function TakeBreak() {

    const classes = globalconstants.useStyles();

    const [breakDuration, setBreakDuration] = useState(0);
    const [modalState, setModalState] = useState({
        open: false,
        title: "On Break",
    });

    const closeModal = () => {
        setModalState({...modalState, open:false});
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetch(globalconstants.BASE_URL + '/walk-in-appointment/take-break?breakDuration=' + breakDuration, {
            method: 'GET',
            headers: {
                'Authorization': globalconstants.accessToken(),
            }
        })
        .then( (response) => response.json())
        .then( (appointmentStatus) => {
            console.log("Appointment Status with Break Time");
            console.log(appointmentStatus);
            setModalState(
                {
                    ...modalState,
                    open: true,
                    title: "On Break"
                }
            );
        })
    }


    const handleChange = (name) => (e) => {
        let value = e.target.value;
        setBreakDuration(value);
    }

    const endBreak = () => {
        
        fetch(globalconstants.BASE_URL + '/walk-in-appointment/take-break?breakDuration=' + (breakDuration * -1), {
            method: 'GET',
            headers: {
                'Authorization': globalconstants.accessToken(),
            }
        })
        .then( (response) => response.json())
        .then( (appointmentStatus) => {
            setBreakDuration(appointmentStatus.doctorBreakDuration);
            console.log("Doctor Resume After Break");
            console.log(appointmentStatus);
            setModalState( 
                {
                    ...modalState,
                    open: false,
                    title: "On Break"
                }
            );
        })
    }

    return (
        // <div className={classes.root}>
            
            <Paper className={classes.root} style={{padding: 10}}>
                <AlertDialog 
                    open={modalState.open}
                    title={modalState.title}
                    content={<AppointmentStatus />}
                    handleClose={closeModal}
                    userActions={[{color: "primary", perform: endBreak, text: "End Break"}]}
                />
                <Typography variant="h6">
                    Take a Break
                </Typography>
                <Typography variant="body1">
                    Fill in the approximate value in minutes and click on the "Take Break" button.
                    The time will be reflected in the average waiting time of the queue.
                </Typography>
                <form onSubmit={handleFormSubmit} id="break-duration-form">
                    <FormControl fullWidth margin="normal">
                        
                        <TextField 
                            id="break-duration" 
                            variant="outlined" 
                            type="number"
                            name="breakDuration"
                            onChange={handleChange('breakDuration')}
                            value={breakDuration}
                            label="Break Duration"
                            >
                        </TextField>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <Button variant="contained" color="primary" type="submit" disabled={breakDuration == 0}>
                            Take Break
                        </Button>
                    </FormControl>
                </form>
            </Paper>
        // </div>
    );
}