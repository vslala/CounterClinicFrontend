import React from 'react';
import { Paper, FormGroup, FormControl, TextField, Select, MenuItem } from '@material-ui/core';
import * as globalconstants from '../../global-constants';

export default function RegisterUser() {

    const classes = globalconstants.useStyles();

    const [user, setUser] = useState({});

    const handleChange = (name) => (e) => {
        let value = e.target.value;
        setUser({
            ...user,
            [name]: value
        });
    }

    const firstNameTextField = () => {
        return (
            <FormControl fullWidth margin="normal">
                <TextField 
                    id="first-name"
                    name="firstName"
                    onChange={handleChange("firstName")}
                    value={user.firstName}
                />
            </FormControl>
        );
    }

    const lastNameTextField = () => {
        return (
        <FormControl fullWidth margin="normal">
            <TextField 
                id="last-name"
                name="lastName"
                onChange={handleChange("lastName")}
                value={user.lastName}
            />
        </FormControl>
        );
    }

    const emailTextField = () => {
        return (
            <FormControl fullWidth margin="normal">
                <TextField 
                    id="email"
                    name="email"
                    onChange={handleChange("email")}
                    value={user.email}
                    type="email"
                />
            </FormControl>
        );
    }

    const mobileTextField = () => {
        return (
            <FormControl fullWidth margin="normal">
                <TextField 
                    id="mobile"
                    name="mobile"
                    onChange={handleChange("mobile")}
                    value={user.mobile}
                />
            </FormControl>
        );
    }

    const usernameTextField = () => {
        return (
            <FormControl fullWidth margin="normal">
                <TextField 
                    id="username"
                    name="username"
                    onChange={handleChange("username")}
                    value={user.username}
                />
            </FormControl>
        );
    }

    const rolesSelectField = () => {
        return (
            <Select
                value={user.userRole}
                name="userRole"
                id="user-role"
                onChange={handleChange('userRole')}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {
                    ["DOCTOR", "RECEPTIONIST", "ADMIN", "SUPER_ADMIN"].map( (userRole, index) => (
                        <MenuItem value={userRole}>{userRole}</MenuItem>
                    ))
                }
            </Select>
        );
    }

    const passwordTextField = () => {
        return (
            <FormControl fullWidth margin="normal">
                <TextField 
                    id="password"
                    name="password"
                    onChange={handleChange("password")}
                    value={user.password}
                    type="password"
                />
            </FormControl>
        );
    }

    return (
        <Paper className={classes.root}>
            <form>
                { firstNameTextField }
                { lastNameTextField }
                { emailTextField }
                { mobileTextField }
                { usernameTextField }
                { passwordTextField } 
                { rolesSelectField }
            </form>
        </Paper>
    );
} 