import React, {useState} from 'react';
import * as globalconstants from '../../global-constants';
import RegisterUser from '../../components/RegisterUser';
import {Fade, Grid, LinearProgress, Paper} from "@material-ui/core";

function Register(props) {

    const classes = globalconstants.useStyles();

    const handleAfterRegister = (userLogin) => {
        console.log("After Registration: ", userLogin);
        props.history.push("/login");
    }

    const handleRegister = (user) => {
        setShowLoader(true);
        console.log("Registering user: ", user);
        console.log("Registration API Url:", props.submitUrl);
        let registerUrl = props.submitUrl ? props.submitUrl : `http://206.189.30.73:8084/api/v1/user/register/`;
        fetch(registerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then( (response) => response.json())
        .then( (userLogin) => {
            console.log(userLogin);
            if (props.afterRegister)
                props.afterRegister(userLogin);
            props.history.push("/login");
        })
        .catch(error => {
            setShowLoader(false);
        });
    }

    const [showLoader, setShowLoader] = useState(false);

    return (
        <Grid container justify="center" alignItems="center">
            <Paper className={classes.root} style={{padding: 10, maxWidth: 400}}>
                <RegisterUser
                    roles={["DOCTOR", "RECEPTIONIST", "ADMIN", "SUPER_ADMIN", "PATIENT"]}
                    submitUrl={globalconstants.API.registerUrl}
                    afterRegister={handleAfterRegister}
                    handleRegister={handleRegister}
                    loginUrl={"/login"}
                    />
                <Fade in={showLoader} unmountOnExit>
                    <LinearProgress/>
                </Fade>
            </Paper>
        </Grid>
    );
}

export default Register;