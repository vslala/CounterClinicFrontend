import React from 'react';
import { Box, Paper, Button, Typography } from '@material-ui/core';
import * as globalconstants from '../../global-constants'; 

export default function CallNextPatient() {

    const classes = globalconstants.useStyles();

    const callNextPatient = (e) => {
        fetch(globalconstants.BASE_URL + '/walk-in-appointment/call-next-patient')
        .then( (response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        }) 
        .then( (appointmentStatus) => {
            console.log(appointmentStatus);
        })
        .catch( (error) => {
            console.log("Error calling next patient.");
            if (error.errorCode === '0001') {
                console.log(error.message);
            }
        })
    }

    return (
        <Paper className={classes.root} style={{padding: 10}}>
            <Box >
                <Typography variant="h5">Call Next Patient</Typography>
                <Typography variant="body1">
                    Click the button when you are done with the current patient 
                    and wants to see the next patient in the queue.
                </Typography>
                <Button onClick={callNextPatient} variant="contained" color="primary">
                    <Typography variant="body1">Call Next Patient</Typography>
                </Button>
            </Box>
        </Paper>
    );
}