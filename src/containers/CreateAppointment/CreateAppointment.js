import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TextField, Select, InputLabel, Button, List, ListItem, Box, Container, FormControl, MenuItem } from '@material-ui/core';
import axios from 'axios';

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
        let data = JSON.stringify(walkInAppointment);
        console.log(walkInAppointment.patientFirstName);
        console.log(walkInAppointment.patientLastName);
        console.log(walkInAppointment.selectedDoctorId);
        console.log(data);

        fetch('http://localhost:8080/user/create-appointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJpc3MiOiJjb3VudGVyY2xpbmljIn0.W00g99FmJCpnaWCRB2xlBlX1AVKPHja8TbYTsiMJiIo'
            },
            body: data
        })
        .then( (resp) => resp.json())
        .then( (respJson) => console.log(respJson) );
        
        // axios.defaults.headers.common['authorization'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJpc3MiOiJjb3VudGVyY2xpbmljIn0.W00g99FmJCpnaWCRB2xlBlX1AVKPHja8TbYTsiMJiIo';
        // axios.post("http://localhost:8080/user/create-appointment", walkInAppointment)
        // .then( function (response) {
        //     console.log(response);
        // });
    }

    return (
        <div>
            
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
                
        </div>
    );
    
}