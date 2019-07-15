import React from 'react';
import { Grid, Paper, Button, Typography } from '@material-ui/core';
import { Route } from 'react-router-dom';
import * as globalconstants from '../../global-constants';
import RegisterUser from '../../components/RegisterUser';
import ViewUserList from '../../components/ViewUserList';
import CreateSlots from '../../components/CreateSlots/CreateSlots';
import CounterClinicAppBar from '../../components/AppBar';
import { Add, FormatListBulleted, Settings, CalendarToday } from '@material-ui/icons';
import FileUpload from '../../components/FileUpload/FileUpload';

export default function AdminDashboard(props) {

    const classes = globalconstants.useStyles();

    
    const getPage = (path) => {
        console.log(path);
        if (path === 'register-new-user') {
            return <RegisterUser 
                history={props.history} 
                submitUrl={globalconstants.API.registerUrl} 
            />
        }

        if (path === 'view-users') {
            return <ViewUserList />
        }

        if (path === 'create-slots') {
            return <CreateSlots />
        }

        if (path === 'settings') {
            return (
                <Grid className={classes.root} container justify="center">
                    <Grid item xs={6}>
                        <Paper className={classes.root}>
                            <Typography variant="h4">Upload Site Logo</Typography>
                            <FileUpload fileUploadUrl={`${globalconstants.BASE_URL}/user/file-upload`} attachmentType={globalconstants.attachmentType.siteLogo} />
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.root}>
                            <Typography variant="h4">Upload Advertisement Image</Typography>
                            <FileUpload fileUploadUrl={`${globalconstants.BASE_URL}/user/file-upload`} attachmentType={globalconstants.attachmentType.adImage} />
                        </Paper>
                    </Grid>
                </Grid>
            );
        }

        return (
            <Grid className={classes.root} container justify="center">
                
                {
                    [
                        {btnText: "Add New User", icon: <Add />, onClick: () => props.history.push("/dashboard/register-new-user")}, 
                        {btnText: "View All Users", icon: <FormatListBulleted />, onClick: () => props.history.push("/dashboard/view-users")},
                        {btnText: "View/Update Settings", icon: <Settings />, onClick: () => props.history.push("/dashboard/settings")},
                        {btnText: "Create Slots", icon: <CalendarToday />, onClick: () => props.history.push("/dashboard/create-slots")},
                    ].map( (item,index) => (
                        <Grid key={index} item xs={4} style={{marginLeft: 10, marginTop: 10}}>
                            <Button key={index} fullWidth color="inherit" variant="outlined" style={{padding: 50}} onClick={item.onClick}>
                                { item.icon }
                                { item.btnText }
                            </Button>
                        </Grid>
                    ))
                }
                
            </Grid>
        );
    }

    return (
        <div>    
            <CounterClinicAppBar 
                history={props.history}
                title={"Admin Dashboard: Welcome, " + props.loggedInUser.fullName}
                navLinks={[
                    {link: "/dashboard", text:"Dashboard"}, 
                    {link: "/dashboard/register-new-user", text: "Register New User"},
                    {link: "/dashboard/view-users", text: "View All Users"},
                    {link: "/dashboard/create-slots", text: "Create Slots"}
                ]}
            />
            { getPage(props.path.params.path) }
        </div>
        
    );
}