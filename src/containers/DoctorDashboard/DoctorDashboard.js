import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import CallNextPatient from '../../components/CallNextPatient';
import AppointmentStatus from '../../components/AppointmentStatus/AppointmentStatus';
import * as globalconstants from '../../global-constants';
import TakeBreak from '../../components/TakeBreak';
import Calendar from '../../components/Calendar';

export default function DoctorDashboard(props) {


    const classes = globalconstants.useStyles();

    const getPage = (path) => {
        if (props.path.params.path === 'calendar') {
            return (
                <Paper className={classes.root}>
                    <Calendar />
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