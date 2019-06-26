import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import CreateAppointment from "../../components/CreateAppointment";
import ViewAppointmentList from "../../components/ViewAppointmentList";
import QRCode from "../../components/QRCode/QRCode";
import * as globalconstants from "../../global-constants";

export default function ReceptionDashboard() {

    return (
        <div style={{marginTop: globalconstants.TOP_MARGIN}}>
            <Grid container >
                <Grid item xs={12}>
                    <CreateAppointment  />
                </Grid>
                <Grid item xs={12}>
                    <ViewAppointmentList />
                </Grid>
            </Grid>
        </div>
    );
}