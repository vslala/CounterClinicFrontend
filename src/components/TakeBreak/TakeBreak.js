import React, { useState } from 'react';
import { FormControl, TextField, FormLabel, Button, Paper } from '@material-ui/core';
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
        fetch(globalconstants.BASE_URL + '/walk-in-appointment/take-break?breakDuration=' + breakDuration)
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
        
        fetch(globalconstants.BASE_URL + '/walk-in-appointment/take-break?breakDuration=' + (breakDuration * -1))
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
        <div className={classes.root}>
            <AlertDialog 
                open={modalState.open}
                title={modalState.title}
                content={<AppointmentStatus />}
                handleClose={closeModal}
                userActions={[{color: "primary", perform: endBreak, text: "End Break"}]}
            />
            <Paper>
            <form onSubmit={handleFormSubmit} id="break-duration-form">
                <FormControl fullWidth margin="normal">
                    <FormLabel htmlFor="break-duration">
                        Break Duration
                    </FormLabel>
                    <TextField 
                        id="break-duration" 
                        variant="outlined" 
                        type="number"
                        name="breakDuration"
                        onChange={handleChange('breakDuration')}
                        value={breakDuration}
                        >
                    </TextField>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <Button variant="contained" type="submit" disabled={breakDuration === 0}>
                        Take Break
                    </Button>
                </FormControl>
            </form>
            </Paper>
        </div>
    );
}