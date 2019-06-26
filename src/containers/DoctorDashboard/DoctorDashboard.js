import React from 'react';
import { Grid, Paper, Box, Button } from '@material-ui/core';
import CallNextPatient from '../../components/CallNextPatient';
import AppointmentStatus from '../../components/AppointmentStatus/AppointmentStatus';
import CreateAppointment from '../../components/CreateAppointment';
import ViewAppointmentList from '../../components/ViewAppointmentList';
import * as globalconstants from '../../global-constants';

export default function DoctorDashboard() {

    return (
        <div style={{marginTop: globalconstants.TOP_MARGIN}}>
            <Grid container >
                <Grid item xs={6}>
                    <CallNextPatient />
                </Grid>
                <Grid item xs={6}>
                    <AppointmentStatus />
                </Grid>
            </Grid>
        </div>
    );
}