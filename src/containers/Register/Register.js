import React from 'react';
import { Paper, Link } from '@material-ui/core';
import * as globalconstants from '../../global-constants';
import RegisterUser from '../../components/RegisterUser';
import LoginForm from '../../components/LoginForm/LoginForm';

function Register(props) {

    const classes = globalconstants.useStyles();

    const handleAfterRegister = (userLogin) => {
        console.log("After Registration: ", userLogin);
        window.location = "/login";
    }
//globalconstants.BASE_URL + '/user/register-user'
    return (
        <Paper>
            <RegisterUser 
                roles={["DOCTOR", "RECEPTIONIST", "ADMIN", "SUPER_ADMIN", "PATIENT"]} 
                submitUrl={globalconstants.API.registerUrl}
                afterRegister={handleAfterRegister}
                loginUrl={"/login"}
                />
        </Paper>
    );
}

export default Register;