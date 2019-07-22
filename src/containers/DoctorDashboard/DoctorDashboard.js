import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Grid, Paper } from '@material-ui/core';
import CallNextPatient from '../../components/CallNextPatient';
import AppointmentStatus from '../../components/AppointmentStatus/AppointmentStatus';
import * as globalconstants from '../../global-constants';
import TakeBreak from '../../components/TakeBreak';
import Calendar from '../../components/Calendar';
import moment from 'moment';

export default function DoctorDashboard(props) {

    const loggedInUser = useSelector(state => state.loggedInUser);
    var fetchBookedAppointments = new Promise( (resolve, reject) => {
        let accessToken = localStorage.getItem(globalconstants.ACCESS_TOKEN);
        
        fetch(`${globalconstants.API.online.fetchAllAppointmentsUrl}?doctorId=${loggedInUser.userId}`, {
            method: 'GET',
            headers: {
                'Authorization': accessToken
            }
        })
        .then(globalconstants.handleErrors)
        .then(response => response.json())
        .then(bookedAppointments => {
            console.log("Fetched Booked Appointments: ", bookedAppointments);
            resolve(bookedAppointments);
        })
        .catch(error => {
            console.log("Error encountered while trying to fetch the booked appointments for the doctor.", error);
            reject(Error(error));
        });
    });

    var fetchDoctorSlots = (selectedDate) => new Promise( (resolve, reject) => {
        fetch(`${globalconstants.API.fetchDoctorSlots}?appointmentDate=${selectedDate}&doctorId=${loggedInUser.userId}`, {
            method: 'GEt',
            headers: {
                'Authorization': localStorage.getItem(globalconstants.ACCESS_TOKEN)
            }
        })
        .then(globalconstants.handleErrors)
        .then(response => response.json())
        .then( availableSlots => {
            console.log("Fetched doctor available slots", availableSlots);
            resolve(availableSlots);
        })
        .catch(error => {
            console.log("Encountered error while trying to fetch doctors available slots.")
            reject(error);
        });
    });

    const [bookedAppointments, setBookedAppointments] = useState([]);
    const [calendarEvents, setCalendarEvents] = useState([]);  
    const classes = globalconstants.useStyles();

    useEffect(() => {
        fetchBookedAppointments.then(bookedAppointments => {
            setBookedAppointments(
                bookedAppointments.reduce( (prev, curr) => {
                    prev.push({
                        id: curr.appointmentId,
                        title: curr.patientFirstName + ' ' + curr.patientLastName,
                        slot: curr.slot,
                        start: moment(curr.appointmentDate + ' ' + curr.slot.startTime, globalconstants.LOCAL_DATE_TIME_FORMAT).format(),
                        end: moment(curr.appointmentDate + ' ' + curr.slot.endTime, globalconstants.LOCAL_DATE_TIME_FORMAT).format(),
                    });
                    return prev;
                }, [] )
            );
        });
    }, [])

    const getPage = (path) => {
        if (props.path.params.path === 'calendar') {
            /*
            {
                "appointmentId": 1,
                "appointmentDate": "2019-07-17",
                "doctorFirstName": "Priyanka",
                "doctorLastName": "Yadav",
                "patientFirstName": "Pyaare",
                "patientLastName": "Mohan",
                "slot": {
                    "slotId": 168,
                    "startTime": "10:00:00",
                    "endTime": "10:30:00"
                },
                "totalFees": 500,
                "amountPaid": 0
            }
            */
            
            console.log("Calendar Events: ", bookedAppointments);
            return (
                <Paper className={classes.root}>
                    <Calendar events={bookedAppointments} fetchSlots={fetchDoctorSlots} />
                </Paper>
            );
        }

        return (
            <div style={{marginTop: globalconstants.TOP_MARGIN}}>
                <Grid container >
                    <Grid item xs={6}>
                        <CallNextPatient />
                        <TakeBreak />
                    </Grid>
                    <Grid item xs={6}>
                        <AppointmentStatus />
                    </Grid>
                </Grid>
            </div>
        );
    }
    

    return (
        <div>
        { getPage(props.path.params.path) }
        </div>
    );
}