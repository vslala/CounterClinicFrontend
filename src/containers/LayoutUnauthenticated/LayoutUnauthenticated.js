import React from 'react';
import { Box } from '@material-ui/core';
import LoginForm from '../../components/LoginForm/LoginForm';

function LayoutUnauthenticated() {

    return (
        <div>
            <Box>
                <LoginForm />
            </Box>
        </div>
    );
}

export default LayoutUnauthenticated;