import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Typography, Divider, Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
}));

export default function ViewAppointmentList() {
    
    const classes = useStyles();

    const [appointments, setAppointments] = useState({
        walkInAppointmentList: []
    });

    const fetchAppointments = () => {
        fetch('http://localhost:8080/walk-in-appointment/all')
        .then( (respJson) => respJson.json() )
        .then( (json) => {
            setAppointments(json);
        })
        .catch( () => {console.log("error fetching the appointments")});
    }

    useEffect(() => {
        fetchAppointments();
    }, []);

    const tableRows = appointments.walkInAppointmentList.map( (appointment) => (
        <TableRow key={appointment.walkInAppointmentId}>
            <TableCell align="center">{ appointment.walkInAppointmentId }</TableCell>
            <TableCell align="center">{ appointment.patientFirstName }</TableCell>
            <TableCell align="center">{ appointment.patientLastName }</TableCell>
            <TableCell align="center">{ appointment.appointedDoctorId }</TableCell>
            <TableCell align="center">{ appointment.createdAt }</TableCell>
        </TableRow>
    ));

    const tableHeader = () => (
        <TableHead>
            <TableRow>
                <TableCell><Typography variant="body2">Appointment ID</Typography></TableCell>
                <TableCell>Patient First Name</TableCell>
                <TableCell>Patient Last Name</TableCell>
                <TableCell>Appointed Doctor Id</TableCell>
                <TableCell>Appointment Date/Time</TableCell>
            </TableRow>
        </TableHead>
    );

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Appointment ID</TableCell>
                        <TableCell align="center">Patient First Name</TableCell>
                        <TableCell align="center">Patient Last Name</TableCell>
                        <TableCell align="center">Appointed Doctor Id</TableCell>
                        <TableCell align="center">Appointment Date/Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                { tableRows }
                </TableBody>
                
            </Table>
        </Paper>
    );
}