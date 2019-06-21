import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import CreateAppointment from "../../components/CreateAppointment";
import ViewAppointmentList from "../../components/ViewAppointmentList";

export default function ReceptionDashboard() {

    const [appointment, setAppointment] = useState({});

    const newAppointment = (appointment) => {};

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <CreateAppointment createAppointmentCallBack={newAppointment} />
                </Grid>
                <Grid item xs={12}>
                    <ViewAppointmentList newAppointment={appointment}/>
                </Grid>
            </Grid>
        </div>
    );
}