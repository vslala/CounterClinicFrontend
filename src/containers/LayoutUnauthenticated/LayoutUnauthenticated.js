import React from 'react';
import {Box} from '@material-ui/core';
import LoginForm from '../../components/LoginForm/LoginForm';
import {Redirect} from "react-router-dom";

function LayoutUnauthenticated() {

    const loginApiEndpoint = "http://206.189.30.73:8084/api/v1/user/login";

    return (
        <div>
            <Box>
                <Redirect to={'/login'} />
            </Box>
        </div>
    );
}

export default LayoutUnauthenticated;