import React, {useState} from 'react';
import {
    Avatar,
    Button,
    Fade,
    FormControl,
    Grid,
    IconButton,
    LinearProgress,
    Link,
    Paper,
    Snackbar,
    TextField,
    Typography
} from '@material-ui/core';
import * as globalconstants from '../../global-constants';
import {setLoggedInUser} from '../../actions';
import store from '../../store';
import {withRouter} from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';

function LoginForm(props) {

    const classes = globalconstants.useStyles();

    const [showLoader, setShowLoader] = useState(false);

    const [snackbarState, setSnackbarState] = useState({
        open: false,
        handleClose: () => setSnackbarState({...snackbarState, open: false}),
        message: "",
    });

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (name) => (e) => {
        setFormData({...formData, [name]:e.target.value});
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let data = JSON.stringify(formData);
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
            console.log("Data: ", data);
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
        <Grid container justify="center">
            <Snackbar anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
            open={snackbarState.open}
            onClose={snackbarState.handleClose}
            ContentProps={{
                "aria-describedby": "message-id"
            }}
            message={<span id="message-id">{snackbarState.message}</span>}
            action={[
                <IconButton key="close" aria-label="Close" color="inherit" onClick={snackbarState.handleClose}><CloseIcon /> </IconButton>,
            ]}
            />
            <Paper className={classes.root} style={{padding: 10, maxWidth: 400}}>
                <Typography variant="h3">Login Here!</Typography>
                <Grid container justify="center" alignItems="center">
                    <Avatar src={"https://via.placeholder.com/150"} 
                        style={{margin: 10, height: 200, width: 200}} 
                    />
                </Grid>
                <form onSubmit={handleFormSubmit} autoComplete="off">
                    <FormControl fullWidth margin="normal">
                        <TextField variant="outlined" fullWidth
                            id="username"
                            name="username"
                            onChange={handleChange('username')}
                            value={formData.username}
                            label="Username"
                        />  
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField variant="outlined" fullWidth
                            id="password"
                            name="password"
                            onChange={handleChange('password')}
                            value={formData.password}
                            type="password"
                            label="Password"
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <Button fullWidth 
                            variant="contained" 
                            color="primary" 
                            type="submit"
                            onClick={() => setShowLoader(true)}
                        >
                            Login
                        </Button>
                    </FormControl>
                    <Fade
                        in={showLoader}
                        unmountOnExit
                    >
                        <LinearProgress  />
                    </Fade>
                    <Link to={"/register"} data-link="/register" variant="body1"
                        onClick={(e) => props.history.push(e.target.dataset.link)}
                    >Register Here!</Link>
                </form>
            </Paper>
        </Grid>
    );
}


export default withRouter(LoginForm);