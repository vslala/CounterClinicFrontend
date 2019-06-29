import React from 'react';
import { Grid } from '@material-ui/core';
import CallNextPatient from '../../components/CallNextPatient';
import AppointmentStatus from '../../components/AppointmentStatus/AppointmentStatus';
import * as globalconstants from '../../global-constants';
import TakeBreak from '../../components/TakeBreak';

export default function DoctorDashboard() {

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