import React, { useState } from 'react';
import { TextField, Select, InputLabel, Button, Container, FormControl, MenuItem, Fade, LinearProgress, Paper, Typography } from '@material-ui/core';
import store from '../../store';
import { createNewAppointment } from '../../actions';

export default function CreateAppointment({createAppointmentCallBack}) {
    
    const [walkInAppointment, setWalkInAppointment] = useState({
        patientFirstName: '',
        patientLastName: '',
        doctorId: 0
    });

    const handleChange = (name) => (e) => {
        setWalkInAppointment({...walkInAppointment, [name]: e.target.value});
    }

    const handleFormSubmit = function(e) {
        setLoading(true);
        let data = JSON.stringify(walkInAppointment);
        console.log(walkInAppointment.patientFirstName);
        console.log(walkInAppointment.patientLastName);
        console.log(walkInAppointment.doctorId);
        console.log(data);

        fetch('http://localhost:8080/user/create-appointment', {
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
            store.dispatch(createNewAppointment(respJson));
        })
        .catch( () => setLoading(false) );
        
        // axios.defaults.headers.common['authorization'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJpc3MiOiJjb3VudGVyY2xpbmljIn0.W00g99FmJCpnaWCRB2xlBlX1AVKPHja8TbYTsiMJiIo';
        // axios.post("http://localhost:8080/user/create-appointment", walkInAppointment)
        // .then( function (response) {
        //     console.log(response);
        // });
    }

    const [loading, setLoading] = useState(false);

    return (
        <div>
            <Paper style={{marginTop: 50}}>
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
                        <Fade in={loading} unmountOnExit>
                            <LinearProgress />
                        </Fade>
                    </form>
                </Container>
            </Paper>
        </div>
    );
    
}