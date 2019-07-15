import React, { useState, useEffect } from 'react';
import * as globalconstants from '../../global-constants';
import { Paper, Select, MenuItem, FormControl, Button, OutlinedInput, InputLabel, Typography } from '@material-ui/core';
import { InputOutlined } from '@material-ui/icons';

function AssignClinic() {

    const classes = globalconstants.useStyles();

    const [doctors, setDoctors] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [formData, setFormData] = useState({
        selectedDoctor: {},
        selectedClinicRoom: {}
    });

    const fetchDoctors = () => {
        fetch(globalconstants.BASE_URL + '/user/all/doctor')
        .then(response => response.json())
        .then(users => {
            console.log("List of doctors: ", doctors);
            setDoctors(users);
        });
    }

    const fetchClinics = () => {
        fetch(globalconstants.BASE_URL + '/clinic/all')
        .then(response => response.json())
        .then(availableClinics => {
            console.log("List of available clinics: ", clinics);
            setClinics(availableClinics);
        });
    }

    useEffect(() => {
        fetchDoctors();
        fetchClinics();
    }, [])

    const handleChange = (name) => (e) => {
        let value = e.target.value;
        console.log("Selected Value: ", value);
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Assigning clinic to user", formData);
        fetch(globalconstants.BASE_URL + '/clinic/assign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(assignedUser => {
            console.log("Assigned User", assignedUser);

        })
    }
    return (
        <Paper className={classes.root} style={{padding: 10}}>
            <Typography variant="h5">Assign Clinic to Doctor</Typography>
            <form autoComplete="off" onSubmit={handleFormSubmit}>
                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel htmlFor="selected-doctor">Select Doctor</InputLabel>
                    <Select fullWidth input={<OutlinedInput id="selected-doctor" name="selectedDoctor" />}
                        onChange={handleChange('selectedDoctor')}
                        value={formData.selectedDoctor}
                    >
                        <MenuItem disabled value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            doctors.map((user,index) => (
                                <MenuItem key={index} value={user}>{ user.fullName }</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel htmlFor="selected-clinic-room">Select Clinic</InputLabel>
                    <Select fullWidth input={<OutlinedInput id="selected-clinic-room" name="selectedClinicRoom" />}
                        onChange={handleChange('selectedClinicRoom')}
                        value={formData.selectedClinicRoom}
                    >
                        <MenuItem disabled value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            clinics.map((clinic,index) => (
                                <MenuItem key={index} value={clinic}>{ clinic.name }</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <Button fullWidth variant="contained" color="primary" type="submit">
                        Assign Clinic
                    </Button>
                </FormControl>
            </form>
        </Paper>
    );

}


export default AssignClinic;