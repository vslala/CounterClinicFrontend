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
import moment from 'moment';

export default function ViewAppointmentList() {
    
    const classes = globalconstants.useStyles();

    const appointments = useSelector(state => state.appointments);

    const fetchAppointments = () => {
        fetch(globalconstants.API.fetchAllAppointmentsUrl, {
            method: 'GET',
            headers: {
                'Authorization': globalconstants.accessToken()
            }
        })
        .then(globalconstants.handleErrors)
        .then( (respJson) => respJson.json() )
        .then( (json) => {
            store.dispatch(setAppointments(json));
        })
        .catch( (error) => {console.log("error fetching the appointments. Error: ", error)});
    }

    useEffect(() => {
        fetchAppointments();
    }, []);

    // delete individual appointment by id
    const deleteAppointment = (walkInAppointmentId) => {
        fetch(`${globalconstants.API.fetchAppointmentByIdUrl}/${walkInAppointmentId}`, {
            method: "DELETE",
            headers: {
                'Authorization': globalconstants.accessToken()
            }
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
        fetch(`${globalconstants.API.fetchQrCodeByAppointmentIdUrl}/${appointmentId}`, {
            method: 'GET',
            headers: {
                'Authorization': globalconstants.accessToken()
            }
        })
        .then(globalconstants.handleErrors)
        .then( (response) => response.json())
        .then( (data) => {
            console.log("Fetched QRCode data");
            console.log(data);
            setQrCode(data);
        })
        .catch( error => {
            console.log("Error fetching qr code from the server. Error: ", error);
        });
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

    const tableRows = appointments.map( (appointment) => {  
        let appointmentDate = moment().format(globalconstants.LOCAL_DATE_TIME_FORMAT);
        if (appointment.createdAt) {
            appointmentDate = moment.utc(appointment.createdAt)
                .local().format(globalconstants.LOCAL_DATE_TIME_FORMAT);
        }
        return (
        <TableRow key={appointment.walkInAppointmentId}>
            <TableCell align="center">{ appointment.walkInAppointmentId }</TableCell>
            <TableCell align="center">{ appointment.patientFirstName }</TableCell>
            <TableCell align="center">{ appointment.patientLastName }</TableCell>
            <TableCell align="center">{ appointment.appointedDoctorId }</TableCell>
            <TableCell align="center">{ appointmentDate }</TableCell>
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
        );
    });

    
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
                title={"QRCode: " + qrCode.qrCodeName}
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