import React, {useState} from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import * as globalconstants from '../../global-constants';
import {Redirect} from 'react-router-dom';
import store from "../../store";
import {setLoggedInUser} from "../../actions";
import {Fade, Grid, IconButton, LinearProgress, Link, Paper, Snackbar} from "@material-ui/core";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";

function Login(props) {

    const classes = globalconstants.useStyles();

    const [showLoader, setShowLoader] = useState(false);

    // const loggedInUser = useSelector(state => state.loggedInUser);
    const loggedInUser = JSON.parse(localStorage.getItem(globalconstants.LOGGED_IN_USER));


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
            .then(response => {
                console.log("Converting to json");
                return response.json();
            })
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
            });
    }

    //
    // SnackbarState
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        handleClose: () => setSnackbarState({...snackbarState, open: false}),
        message: "",
    });

    console.log("Logged In User", loggedInUser);
    if (loggedInUser && loggedInUser.roles) {
        return <Redirect to={"/dashboard"}/>
    }

    return (
        <div>
            <Grid container justify="center">
                <Paper style={{padding: 10, maxWidth: 400}}>
                    <Snackbar
                        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                        open={snackbarState.open}
                        onClose={snackbarState.handleClose}
                        ContentProps={{"aria-describedby": "message-id"}}
                        message={<span id="message-id">{snackbarState.message}</span>}
                        action={[
                            <IconButton key="close" aria-label="Close" color="inherit"
                                        onClick={snackbarState.handleClose}><CloseIcon/>
                            </IconButton>,
                        ]}
                    />

                    <LoginForm history={props.history}
                               handleLogin={handleLogin}
                               setShowLoader={setShowLoader}
                               loginApiEndpoint={globalconstants.MOCKED_BASE_URL + '/login'}/>

                    <Fade in={showLoader} unmountOnExit>
                        <LinearProgress/>
                    </Fade>

                    <Link to={"/register"} data-link="/register" variant="body1"
                          onClick={(e) => props.history.push(e.target.dataset.link)}
                    >Register Here!</Link>
                </Paper>
            </Grid>
        </div>
    );
}

export default Login;