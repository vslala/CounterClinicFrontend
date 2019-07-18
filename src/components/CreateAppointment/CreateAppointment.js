import React, { useState, useEffect } from 'react';
import { TextField, Select, InputLabel, Button, Container, FormControl, MenuItem, Fade, LinearProgress, Paper, Typography } from '@material-ui/core';
import store from '../../store';
import { createNewAppointment, createNewQRCode } from '../../actions';
import * as globalconstants from '../../global-constants';
import AlertDialog from '../AlertDialog/AlertDialog';
import AppointmentDetail from '../ApointmentDetail';

export default function CreateAppointment() {

    const classes = globalconstants.useStyles();
    
    const [walkInAppointment, setWalkInAppointment] = useState({
        patientFirstName: '',
        patientLastName: '',
        doctorId: 0
    });

    const [doctors, setDoctors] = useState([]);

    const handleChange = (name) => (e) => {
        setWalkInAppointment({...walkInAppointment, [name]: e.target.value});
    }

    const fetchDoctors = () => {
        fetch(globalconstants.API.fetchAllDoctors)
        .then( (resp) => resp.json())
        .then( (doctors) => setDoctors(doctors));
    }

    const fetchQRCode = (appointmentId) => {
        fetch(`${globalconstants.API.fetchQrCodeByAppointmentIdUrl}/${appointmentId}`)
        .then( (response) => response.json())
        .then( (data) => {
            console.log(data);
            store.dispatch(createNewQRCode(data));
        });
    }

    const [appointmentId, setAppointmentId] = useState(0);
    const [open, setOpen] = useState(false);
    const handleOpen = (appointmentId) => {
        // fetch(globalconstants.BASE_URL + '/walk-in-appointment/wrapper/id/' + appointmentId)
        // .then( (response) => response.json())
        // .then( (data) => {
        //     console.log("Showing appointment info")
        //     console.log(data);
        //     setAppointmentInfo(data);
        // })
        setAppointmentId(appointmentId);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const handleFormSubmit = function(e) {
        setLoading(true);
        let data = JSON.stringify(walkInAppointment);
        console.log(walkInAppointment.patientFirstName);
        console.log(walkInAppointment.patientLastName);
        console.log(walkInAppointment.doctorId);
        console.log(data);

        fetch(globalconstants.API.createNewAppointmentUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJpc3MiOiJjb3VudGVyY2xpbmljIn0.W00g99FmJCpnaWCRB2xlBlX1AVKPHja8TbYTsiMJiIo'
            },
            body: data
        })
        .then( (resp) => resp.json())
        .then( (respJson) => {
            setLoading(false);
            console.log(respJson);
            setWalkInAppointment({
                ...walkInAppointment,
                patientFirstName: '',
                patientLastName: '',
                doctorId: 0 
            });
            store.dispatch(createNewAppointment(respJson));
            fetchQRCode(respJson.walkInAppointmentId);
            handleOpen(respJson.walkInAppointmentId);
        })
        .catch( () => setLoading(false) );
        
    }

    useEffect(() => {
        fetchDoctors();
    }, [])

    const [loading, setLoading] = useState(false);

    return (
        // <div>
            <Paper className={classes.root} style={{padding: 10}}>
                <AlertDialog 
                    open={open}
                    handleClose={handleClose}
                    title={"Appointment Info"}
                    content={<AppointmentDetail appointmentId={appointmentId} />}
                />
                <Typography variant="h5">Create Appointment By Doctor</Typography>
                <Container fixed>
                    <form autoComplete = "off" onSubmit={handleFormSubmit}>
                        <FormControl fullWidth margin="normal">
                            <TextField id="patient-first-name" 
                                id="first-name"
                                name="patientFirstName" 
                                label="First Name"
                                value={walkInAppointment.patientFirstName}
                                onChange={handleChange('patientFirstName')}
                                fullWidth
                                />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                inputProps={{
                                    name: 'patientLastName',
                                    id: 'patient-last-name'
                                }} 
                                label="Last Name"
                                value={walkInAppointment.patientLastName}
                                onChange={handleChange('patientLastName')}
                                fullWidth
                                />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="selected-doctor">Select...</InputLabel>
                            <Select
                                id="selected-doctor"
                                name="doctorId"
                                value={walkInAppointment.doctorId}
                                onChange={handleChange('doctorId')}
                                fullWidth
                            >
                                <MenuItem>None</MenuItem>
                                {
                                    doctors.map( (doc, index) => (
                                        <MenuItem key={index} value={doc.userId}>{doc.firstName} {doc.lastName}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <Button 
                            color="primary" variant="contained" 
                            onClick={handleFormSubmit}
                            fullWidth
                            >
                                Create Appointment
                            </Button>
                        </FormControl>
                        <Fade in={loading} unmountOnExit>
                            <LinearProgress />
                        </Fade>
                    </form>
                </Container>
            </Paper>
        // </div>
    );
    
}