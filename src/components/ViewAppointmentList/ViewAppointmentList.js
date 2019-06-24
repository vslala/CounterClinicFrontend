import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Typography, Divider, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import store from '../../store';
import { setAppointments } from "../../actions";
import DeleteForeverIcon, {Receipt} from '@material-ui/icons/DeleteForever';
import AlertDialog from "../AlertDialog/AlertDialog";
import * as globalconstants from '../../global-constants';

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

    const appointments = useSelector(state => state.appointments);

    const fetchAppointments = () => {
        fetch('http://localhost:8080/walk-in-appointment/all')
        .then( (respJson) => respJson.json() )
        .then( (json) => {
            store.dispatch(setAppointments(json));
        })
        .catch( () => {console.log("error fetching the appointments")});
    }

    useEffect(() => {
        console.log(appointments);
        fetchAppointments();
    }, []);

    // delete individual appointment by id
    const deleteAppointment = (walkInAppointmentId) => {
        fetch('http://localhost:8080/walk-in-appointment/id/' + walkInAppointmentId, {
            method: "DELETE",
        })
        .then( (response) => response.json())
        .then( (data) => {
            if (data === true)
                fetchAppointments();
        });
    }

    const [open, setOpen] = useState(false);
    const [qrCode, setQrCode] = useState({});

    const fetchQrCode = (appointmentId) => {
        fetch(globalconstants.BASE_URL + '/' + 'walk-in-appointment/' + appointmentId + '/qrcode')
        .then( (response) => response.json())
        .then( (data) => {
            console.log("Fetched QRCode data");
            console.log(data);
            setQrCode(data);
        })
    }

    const handleOpen = (appointmentId) => {
        console.log("Handle Open is Clicked! Appointment ID: " + appointmentId);
        fetchQrCode(appointmentId);
        setOpen(true);
        console.log(open);
    }
    const handleClose = (e) => {
        setOpen(false);
    }

    const tableRows = appointments.map( (appointment) => (
        <TableRow key={appointment.walkInAppointmentId}>
            <TableCell align="center">{ appointment.walkInAppointmentId }</TableCell>
            <TableCell align="center">{ appointment.patientFirstName }</TableCell>
            <TableCell align="center">{ appointment.patientLastName }</TableCell>
            <TableCell align="center">{ appointment.appointedDoctorId }</TableCell>
            <TableCell align="center">{ appointment.createdAt }</TableCell>
            <TableCell align="center">
                <Button onClick={() => handleOpen(appointment.walkInAppointmentId)} >
                    QRCode
                </Button>
            </TableCell>
            <TableCell align="center">
                <Button onClick={() => deleteAppointment(appointment.walkInAppointmentId)}>
                    <DeleteForeverIcon></DeleteForeverIcon>
                </Button>
            </TableCell>
        </TableRow>
    ));

    
    return (
        <Paper className={classes.root}>
            <AlertDialog open={open} 
                handleOpen={handleOpen} 
                handleClose={handleClose} 
                qrCode={qrCode}
                />
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