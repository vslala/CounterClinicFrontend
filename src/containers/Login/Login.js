import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import * as globalconstants from '../../global-constants';

function Login(props) {

    return (
        <div>
            <LoginForm history={props.history} loginApiEndpoint={globalconstants.MOCKED_BASE_URL + '/login'} />
        </div>
    );
}

export default Login;