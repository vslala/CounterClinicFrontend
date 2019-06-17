import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TextField, Select, InputLabel, Button, List, ListItem, Box, Container, FormControl, MenuItem } from '@material-ui/core';

export default function CreateAppointment() {
    
    const [walkInAppointment, setWalkInAppointment] = useState({
        patientFirstName: '',
        patientLastName: '',
        selectedDoctorId: 0
    });

    const handleChange = (name) => (e) => {
        setWalkInAppointment({...walkInAppointment, [name]: e.target.value});
    }

    const handleFormSubmit = function(e) {
        console.log(walkInAppointment.patientFirstName);
        console.log(walkInAppointment.patientLastName);
        console.log(walkInAppointment.selectedDoctorId);
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={6}>
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
                                name="selectedDoctorId"
                                value={walkInAppointment.selectedDoctorId}
                                onChange={handleChange('selectedDoctorId')}
                            >
                                <MenuItem>None</MenuItem>
                                <MenuItem value={1}>Priyanka Yadav</MenuItem>
                                <MenuItem value={2}>Abhishek Ralhan</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <Button color="primary" variant="contained" onClick={handleFormSubmit}>
                                Create Appointment
                            </Button>
                        </FormControl>
                    </form>
                    </Container>
                </Grid>
            </Grid>
        </div>
    );
    
}