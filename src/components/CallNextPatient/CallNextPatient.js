import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
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
        // <Paper >
            <Box className={classes.root}>
                <Button onClick={callNextPatient} variant="outlined">
                    <Typography variant="body1">Call Next Patient</Typography>
                </Button>
            </Box>
        // </Paper>
    );
}