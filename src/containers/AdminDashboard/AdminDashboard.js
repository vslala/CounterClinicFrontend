import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { Route } from 'react-router-dom';
import * as globalconstants from '../../global-constants';
import RegisterUser from '../../components/RegisterUser';
import ViewUserList from '../../components/ViewUserList';

export default function AdminDashboard(props) {

    const classes = globalconstants.useStyles();

    
    const getPage = (path) => {
        console.log(path);
        if (path === 'register-new-user') {
            return <RegisterUser />
        }

        if (path === 'view-users') {
            return <ViewUserList />
        }
    }

    return (
        <div>    
            { getPage(props.path.params.path) }
        </div>
        
    );
}