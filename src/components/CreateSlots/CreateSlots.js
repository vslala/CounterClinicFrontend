import React, { useState } from 'react';
import * as globalconstants from '../../global-constants';
import { Paper, FormControl, TextField, Select, MenuItem, InputLabel, Button, OutlinedInput, Typography } from '@material-ui/core';
import { doctors } from './mokedDoctors';
import moment from 'moment';

function CreateSlots(props) {

    const classes = globalconstants.useStyles();

    const [formData, setFormData] = useState({
        selectedDoctor: [],
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
    }

    return (
        <Paper className={classes.root} style={{padding: 10}}>
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
                        multiple
                        value={formData.selectedDoctor}
                        onChange={handleChange('selectedDoctor')}
                    >
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        {
                            doctors.map( doctor => (
                                <MenuItem value={doctor}>{ doctor.fullName }</MenuItem>
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
                            ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"].map(dayOfWeek => (
                                <MenuItem value={dayOfWeek}>{dayOfWeek}</MenuItem>
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
                        label="Slot Duration"
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