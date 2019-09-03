import React, {useEffect, useState} from 'react';
import * as globalconstants from '../../global-constants';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    Snackbar,
    TextField,
    Typography
} from '@material-ui/core';
// import { doctors } from './mokedDoctors';
import moment from 'moment';

function CreateSlots(props) {

    useEffect(() => {
        fetchDoctors();
    }, [])

    const fetchDoctors = () => {
        fetch(globalconstants.API.fetchAllDoctors, {
            method: 'GET',
            headers: {
                'Authorization': globalconstants.accessToken(),
            }
        })
        .then(response => response.json())
        .then( doctors => {
            console.log("Fetched doctors from the database", doctors);
            setDoctors(doctors);
        })
    }

    const classes = globalconstants.useStyles();

    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: 'Slots have been created successfully!'
    });

    const [doctors, setDoctors] = useState([]);

    const [formData, setFormData] = useState({
        selectedDoctor: {},
        selectedDaysOfWeek: [],
        slotDuration: 15,
        slotStartTime: moment('10:00', globalconstants.LOCAL_TIME_FORMAT).format(globalconstants.LOCAL_TIME_FORMAT),
        slotEndTime: moment('17:00', globalconstants.LOCAL_TIME_FORMAT).format(globalconstants.LOCAL_TIME_FORMAT)
    });

    const handleChange = (name) => (e) => {
        setFormData({...formData, [name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        const postData = {
            daysOfWeek: formData.selectedDaysOfWeek,
            doctorId: formData.selectedDoctor.userId,
            durationInMinutes: formData.slotDuration,
            endTime: formData.slotEndTime,
            startTime: formData.slotStartTime
        };
        console.log("Post Data: ", postData);
        fetch(globalconstants.API.fetchDoctorSlots, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': globalconstants.accessToken()
            },
            body: JSON.stringify(postData)
        })
        // .then(response => response.json())
        .then(responseText => {
            console.log("Response from slot creation: ", responseText);
            setSnackbarState({
                ...snackbarState,
                open: true,
                message: "Slots have been created successfully!"
            })
        });

    }



    return (
        <Paper className={classes.root} style={{padding: 10}}>
            <Snackbar 
                open={snackbarState.open}
                message={snackbarState.message}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                autoHideDuration={6000}
            />
            <Typography variant="h3">{props.title? props.title : 'Create Time Slots'}</Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel htmlFor="selected-doctor">Select Doctor</InputLabel>
                    <Select fullWidth
                        input={
                            <OutlinedInput 
                                id="selected-doctor"
                                name="selectedDoctor" 
                            />
                        }
                        variant="outlined"
                        // multiple
                        value={formData.selectedDoctor}
                        onChange={handleChange('selectedDoctor')}
                    >
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        {
                            doctors.map( (doctor, index) => (
                                <MenuItem key={index} value={doctor}>{ doctor.fullName }</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel htmlFor="selected-days-of-week">Select Days of Week for Slots</InputLabel>
                    <Select fullWidth 
                        variant="outlined"
                        multiple
                        input={
                            <OutlinedInput 
                                id="selected-days-of-week"
                                name="selectedDaysOfWeek"
                            />
                        }
                        value={formData.selectedDaysOfWeek}
                        onChange={handleChange('selectedDaysOfWeek')}
                    >
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        {
                            ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"].map( (dayOfWeek, index) => (
                                <MenuItem key={index} value={dayOfWeek}>{dayOfWeek}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField fullWidth
                        variant="outlined"
                        id="slot-start-time"
                        name="slotStartTime"
                        type="time"
                        label="Slot Start Time"
                        onChange={handleChange('slotStartTime')}
                        value={formData.slotStartTime}
                    ></TextField>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField fullWidth
                        variant="outlined"
                        id="slot-end-time"
                        name="slotEndTime"
                        type="time"
                        label="Slot End Time"
                        onChange={handleChange('slotEndTime')}
                        value={formData.slotEndTime}
                    ></TextField>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField fullWidth
                        variant="outlined"
                        id="slot-duration"
                        name="slotDuration"
                        type="number"
                        label="Slot Duration (minutes)"
                        onChange={handleChange('slotDuration')}
                        value={formData.slotDuration}
                    ></TextField>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <Button type="submit" variant="contained" color="primary">
                        Create Slots
                    </Button>
                </FormControl>
            </form>
        </Paper>
    );
}

export default CreateSlots;