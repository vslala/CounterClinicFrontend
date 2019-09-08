import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Avatar, Button, FormControl, Grid, TextField, Typography} from '@material-ui/core';
import {withRouter} from 'react-router-dom';

function LoginForm(props) {

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
                            onClick={() => props.setShowLoader(true)}
                        >
                            Login
                        </Button>
                    </FormControl>
                </form>
        </Grid>
    );
}

LoginForm.propTypes = {
    history: PropTypes.any.isRequired,
    handleLogin: PropTypes.func.isRequired,
    setShowLoader: PropTypes.func.isRequired
}

export default withRouter(LoginForm);