import React from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import { Route } from 'react-router-dom';
import * as globalconstants from '../../global-constants';
import RegisterUser from '../../components/RegisterUser';
import ViewUserList from '../../components/ViewUserList';
import CreateSlots from '../../components/CreateSlots/CreateSlots';
import CounterClinicAppBar from '../../components/AppBar';
import { Add, FormatListBulleted, Settings } from '@material-ui/icons';
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

        return (
            <Grid className={classes.root} container justify="center">
                <FileUpload />
                {
                    [
                        {btnText: "Add New User", icon: <Add />, onClick: () => props.history.push("/dashboard/register-new-user")}, 
                        {btnText: "View All Users", icon: <FormatListBulleted />, onClick: () => props.history.push("/dashboard/view-users")},
                        {btnText: "View/Update Site Settings", icon: <Settings />, onClick: () => props.history.push("/dashboard/settings")},
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
                title={"Admin Dashboard: Wlecome, " + props.loggedInUser.fullName}
                navLinks={[
                    {link: "/dashboard", text:"Dashboard"}, 
                    {link: "/dashboard/register-new-user", text: "Register New User"},
                    {link: "/dashboard/view-users", text: "View All Users"}
                ]}
            />
            { getPage(props.path.params.path) }
        </div>
        
    );
}