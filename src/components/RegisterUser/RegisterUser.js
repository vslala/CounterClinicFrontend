import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, FormControl, Input, InputLabel, Link, MenuItem, Select, TextField, Typography} from '@material-ui/core';
import * as globalconstants from '../../global-constants';
import {withRouter} from 'react-router-dom';

function RegisterUser(props) {

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        username: '',
        password: '',
        roles: [],
        preferredLanguage: 'ENGLISH'
    });

    const [userRoles, setUserRoles] = useState(globalconstants.userRoles);

    const handleChange = (name) => (e) => {
        setUser({
            ...user,
            [name]: e.target.value
        });
    }

    const handleChangeMultiple = (name) => (e) => {
        let userRoles = e.target.value;
        console.log("selected roles: ", userRoles);
        setUser({...user, [name]: userRoles});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleRegister(user);
    }

    return (
        <div>
            <Typography variant="h4">Register New User</Typography>
            <form onSubmit={handleSubmit} autoComplete="off">

                <FormControl fullWidth margin="normal">
                    <TextField
                        id="first-name"
                        name="firstName"
                        onChange={handleChange("firstName")}
                        value={user.firstName}
                        fullWidth
                        label={"First Name"}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        id="last-name"
                        name="lastName"
                        onChange={handleChange("lastName")}
                        value={user.lastName}
                        fullWidth
                        label={"Last Name"}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        id="email"
                        name="email"
                        onChange={handleChange("email")}
                        value={user.email}
                        type="email"
                        fullWidth
                        label="Email Address"
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        id="mobile"
                        name="mobile"
                        onChange={handleChange("mobile")}
                        value={user.mobile}
                        fullWidth
                        label="Mobile"
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        id="username"
                        name="username"
                        onChange={handleChange("username")}
                        value={user.username}
                        fullWidth
                        label="Username"
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        id="password"
                        name="password"
                        onChange={handleChange("password")}
                        value={user.password}
                        type="password"
                        label="Password"
                        fullWidth
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="user-role">Select User Roles</InputLabel>
                    <Select
                        multiple
                        value={user.roles}
                        name="roles"
                        id="user-role"
                        onChange={handleChangeMultiple('roles')}
                        fullWidth
                        input={<Input id="select-multiple"/>}
                        variant="outlined"
                        required
                    >
                        <MenuItem disabled value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            (props.roles ? props.roles : userRoles).map((userRole, index) => (
                                <MenuItem key={index} value={userRole}>{userRole}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                    >
                        Register User
                    </Button>
                </FormControl>
            </form>
            <Button onClick={() => props.history.push(props.loginUrl)}>
                <Link to={props.loginUrl} variant="body1">Login Here!</Link>
            </Button>
        </div>
    );
}

RegisterUser.propTypes = {
    loginUrl: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    roles: PropTypes.array,
    afterRegister: PropTypes.any,
    handleRegister: PropTypes.func.isRequired,
}

export default withRouter(RegisterUser);