import React from 'react';
import { Grid, Paper, Box, Button, Typography } from '@material-ui/core';
import * as globalconstants from '../../global-constants';

export default function CallNextPatient() {

    const classes = globalconstants.useStyles();

    const callNextPatient = (e) => {
        fetch(globalconstants.BASE_URL + '/walk-in-appointment/call-next-patient')
        .then( (response) => response.json()) 
        .then( (appointmentStatus) => {
            console.log(appointmentStatus);

        })
        .catch( (error) => {
            console.log("Error calling next patient.");
        })
    }

    return (
        <Paper className={classes.root}>
            <Box>
                <Button onClick={callNextPatient}>
                    <Typography variant="body1">Call Next Patient</Typography>
                </Button>
            </Box>
        </Paper>
    );
}