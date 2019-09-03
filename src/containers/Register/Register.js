import React from 'react';
import * as globalconstants from '../../global-constants';
import RegisterUser from '../../components/RegisterUser';

function Register(props) {

    const classes = globalconstants.useStyles();

    const handleAfterRegister = (userLogin) => {
        console.log("After Registration: ", userLogin);
        window.location = "/login";
    }
//globalconstants.BASE_URL + '/user/register-user'
    return (
        
            <RegisterUser 
                roles={["DOCTOR", "RECEPTIONIST", "ADMIN", "SUPER_ADMIN", "PATIENT"]} 
                submitUrl={globalconstants.API.registerUrl}
                afterRegister={handleAfterRegister}
                loginUrl={"/login"}
                />
    );
}

export default Register;