import React, { useState } from 'react';
import { Paper, FormControl, TextField, Button, Typography, Box, Container, CardMedia, Avatar, Grid, LinearProgress, Fade, Link } from '@material-ui/core';
import * as globalconstants from '../../global-constants';
import { setLoggedInUser } from '../../actions';
import LayoutAuthenticated from '../../containers/LayoutAuthenticated';
import store from '../../store';
import { withRouter } from 'react-router-dom';

function LoginForm(props) {

    const classes = globalconstants.useStyles();

    const [showLoader, setShowLoader] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (name) => (e) => {
        setFormData({...formData, [name]:e.target.value});
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Login Details: ", formData);
        let loginApi = props.loginApiEndpoint ? props.loginApiEndpoint : globalconstants.MOCKED_BASE_URL + '/login';
        fetch(loginApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: formData
        })
        .then(response => response.json())
        .then(data => {
            setShowLoader(false);
            console.log("Data: ", data);
            console.log("Got logged in user", data.loggedInUser);
            store.dispatch(setLoggedInUser(data.loggedInUser));
            localStorage.setItem('accessToken', data.accessToken);
            // window.location = "/dashboard";
            props.history.push('/dashboard');
        })
    }

    return (
        <Grid container justify="center">
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
                        onClick={(e) => {window.location = e.target.dataset.link}}
                    >Register Here!</Link>
                </form>
            </Paper>
        </Grid>
    );
}


export default withRouter(LoginForm);