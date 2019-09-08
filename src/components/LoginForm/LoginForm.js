import React, {useState} from 'react';
import PropTypes from 'prop-types';
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
        props.handleLogin(data);

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
                            onClick={() => props.showProgressBar()}
                        >
                            Login
                        </Button>
                    </FormControl>
                    <Fade
                        in={props.shouldShowLoader}
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

LoginForm.propTypes = {
    showProgressBar: PropTypes.func.isRequired,
    shouldShowLoader: PropTypes.bool.isRequired,
    history: PropTypes.any.isRequired
}

export default withRouter(LoginForm);