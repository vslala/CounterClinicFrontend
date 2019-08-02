import React, {useState} from 'react';
import { Box, Paper, Button, Typography, Snackbar } from '@material-ui/core';
import * as globalconstants from '../../global-constants'; 

export default function CallNextPatient() {

    const classes = globalconstants.useStyles();

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: ""
    });
    const showSnackbar = (message) => {
        setSnackbar({...snackbar, open: true, message: message});
        setTimeout(() => {
            setSnackbar({...snackbar, open: false});
        }, 6000);
    } 

    const callNextPatient = (e) => {
        fetch(globalconstants.BASE_URL + '/walk-in-appointment/call-next-patient', {
            method: 'GET',
            headers: {
                'Authorization': globalconstants.accessToken()
            }
        })
        .then(globalconstants.handleErrors)
        .then( (response) => response.json()) 
        .then( (appointmentStatus) => {
            console.log(appointmentStatus);
        })
        .catch( (error) => error)
        .then(error => {
            if (error.errorCode === "0001") {
                showSnackbar(error.message);
            }
        })
    }

    return (
        <Paper className={classes.root} style={{padding: 10}}>
            <Snackbar 
                anchorOrigin={{
                    horizontal: "center",
                    vertical: "bottom"
                }}
                open={snackbar.open}
                message={snackbar.message}
            />
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