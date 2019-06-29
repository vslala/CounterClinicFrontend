import React, { useEffect, useState } from "react";
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import store from '../../store';
import { setAppointments } from "../../actions";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Info from '@material-ui/icons/Info';
import AlertDialog from "../AlertDialog/AlertDialog";
import * as globalconstants from '../../global-constants';
import AppointmentDetail from "../ApointmentDetail";

export default function ViewAppointmentList() {
    
    const classes = globalconstants.useStyles();

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

    const [appointmentId, setAppointmentId] = useState(0);
    const [infoOpen, setInfoOpen] = useState(false);
    const handleInfoOpen = (appointmentId) => {
        setAppointmentId(appointmentId);
        setInfoOpen(true);
    }
    const handleInfoClose = () => {
        setInfoOpen(false);
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
                <Button onClick={() => handleInfoOpen(appointment.walkInAppointmentId)} >
                    <Info />
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
            <AlertDialog 
                open={infoOpen}
                title={"Appointment Info"}
                content={<AppointmentDetail appointmentId={appointmentId} />}
                handleClose={handleInfoClose}

            />
            <AlertDialog open={open} 
                handleOpen={handleOpen} 
                handleClose={handleClose} 
                title={<Typography variant="h6">QRCode: {qrCode.qrCodeName}</Typography>}
                content={<img 
                    src={globalconstants.BASE_URL + '/' + qrCode.qrCodeUrlPath} 
                    alt={qrCode.qrCodeName}
                />}
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