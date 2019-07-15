import React, { useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import CreateAppointment from "../../components/CreateAppointment";
import ViewAppointmentList from "../../components/ViewAppointmentList";
import QRCode from "../../components/QRCode/QRCode";
import * as globalconstants from "../../global-constants";
import Calendar from '../../components/Calendar';
import AssignClinic from "../../components/AssignClinic/AssignClinic";

export default function ReceptionDashboard(props) {

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
                    <Grid item xs={12}>
                        <CreateAppointment  />
                    </Grid>
                    <Grid item xs={12}>
                        <AssignClinic />
                    </Grid>
                    <Grid item xs={12}>
                        <ViewAppointmentList />
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