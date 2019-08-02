import React from 'react';
import { Box } from '@material-ui/core';
import LoginForm from '../../components/LoginForm/LoginForm';

function LayoutUnauthenticated() {

    const loginApiEndpoint = "http://206.189.30.73:8084/api/v1/user/login";

    return (
        <div>
            <Box>
                <LoginForm loginApiEndpoint={loginApiEndpoint} />
            </Box>
        </div>
    );
}

export default LayoutUnauthenticated;