import React, {useState} from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import * as globalconstants from '../../global-constants';
import {Redirect, withRouter} from 'react-router-dom';
import store from "../../store";
import {setLoggedInUser} from "../../actions";
import {IconButton, Snackbar} from "@material-ui/core";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";

function Login(props) {

    // const loggedInUser = useSelector(state => state.loggedInUser);
    const loggedInUser = JSON.parse(localStorage.getItem(globalconstants.LOGGED_IN_USER));


    const [showLoader, setShowLoader] = useState(false);
    const showProgressBar = () => setShowLoader(true);

    const [snackbarState, setSnackbarState] = useState({
        open: false,
        handleClose: () => setSnackbarState({...snackbarState, open: false}),
        message: "",
    });

    console.log("Logged In User", loggedInUser);
    if (loggedInUser && loggedInUser.roles) {
        return <Redirect to={"/dashboard"} />
    }

    const handleLogin = (data) => {
        console.log("Login Details: ", data);
        let loginApi = globalconstants.API.loginUrl ? globalconstants.API.loginUrl : globalconstants.MOCKED_BASE_URL + '/login';
        fetch(loginApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'TimezoneOffset': new Date().getTimezoneOffset
            },
            body: data
        })
        .then(globalconstants.handleErrors)
        .then(response => response.json())
        .then(data => {
            setShowLoader(false);
            console.log("Got logged in user", data.user);
            store.dispatch(setLoggedInUser(data.user));
            localStorage.setItem(globalconstants.LOGGED_IN_USER, JSON.stringify(data.user));
            localStorage.setItem(globalconstants.ACCESS_TOKEN, data.accessToken);
            // window.location = "/dashboard";
            props.history.push('/dashboard');
        })
        .catch(error => {
            setShowLoader(false);
            console.log(error);
            setSnackbarState({...snackbarState, open: true, message: "Error logging in. Please contact the admin."})
        })
    }

    return (
        <div>
            <Snackbar
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              open={snackbarState.open}
              onClose={snackbarState.handleClose}
              ContentProps={{"aria-describedby": "message-id"}}
              message={<span id="message-id">{snackbarState.message}</span>}
              action={[
                  <IconButton key="close" aria-label="Close" color="inherit" onClick={snackbarState.handleClose}><CloseIcon /> </IconButton>,
              ]}
            />
            <LoginForm history={props.history}
                       handleLogin={handleLogin}
                       setShowLoader={showProgressBar}
                       shouldShowLoader={showLoader}
                       loginApiEndpoint={globalconstants.MOCKED_BASE_URL + '/login'} />
        </div>
    );
}

export default Login;