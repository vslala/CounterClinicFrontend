import React from 'react';
import { useSelector } from 'react-redux';
import * as globalconstants from '../../global-constants';
import ReceptionDashboard from '../ReceptionDashboard/ReceptionDashboard';
import CounterClinicAppBar from '../../components/AppBar';
import { Paper, Box } from '@material-ui/core';
import DoctorDashboard from '../DoctorDashboard';
import AdminDashboard from '../AdminDashboard/AdminDashboard';

export default function LayoutAuthenticated(props) {

    const loggedInUser = useSelector(state => state.loggedInUser);

    if (loggedInUser.roles.includes(globalconstants.DOCTOR)) {
        return (
            
            <Box>
                <CounterClinicAppBar navLinks={[
                        {link: "/dashboard", text: "Dashboard"},
                        {link: "/dashboard/calendar", text: "Appointment Calendar"}
                    ]} 
                    title={"Doctor Dashboard: Welcome, " + loggedInUser.fullName} />
                <DoctorDashboard path={props.match} />
            </Box>
            
        );
    }

    if (loggedInUser.roles.includes(globalconstants.RECEPTIONIST)) {
        return (
            <Box>
                <CounterClinicAppBar 
                    title={"Reception Dashboard: Welcome, " + loggedInUser.fullName}
                    navLinks={[{link: "/dashboard", text: "Dashboard"}]} />
                <ReceptionDashboard path={props.match}/>
            </Box>
        );
    }

    if (loggedInUser.roles.includes(globalconstants.ADMIN)) {
        console.log(props.match);
        return (
            <Box>
                <CounterClinicAppBar 
                    title={"Admin Dashboard: Wlecome, " + loggedInUser.fullName}
                    navLinks={[{link: "/dashboard", text:"Dashboard"}, {link: "/dashboard/register-new-user", text: "Register New User"}]}
                    />
                <AdminDashboard path={props.match} />
            </Box>
        );
    }

    return (
        <Paper>You are not authorized to make this request.</Paper>
    );
}