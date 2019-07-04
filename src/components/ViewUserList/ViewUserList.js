import React, { useState, useEffect } from 'react';
import { Paper, FormControl, Typography, Grid, Table, TableHead, TableRow, TableCell, TableBody, Button, FormGroup, TextField, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import * as globalconstants from '../../global-constants';
import { DeleteForever } from '@material-ui/icons';
import AlertDialog from '../AlertDialog';

function ViewUserList() {

    const classes = globalconstants.useStyles();

    const [modal, setModal] = useState({
        open: false,
        fieldName: '',
        errorMessage: '',
        openSnackbar: false,
    });

    const handleModalClose = () => {
        setModal({...modal, ['open']:false});
    }

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});

    const fetchAllUsers = () => {
        fetch(globalconstants.BASE_URL + '/user/all')
        .then( (response) => response.json())
        .then( (users) => {
            console.log("Users List");
            console.log(users);
            setUsers(users);
        })
    }

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const updateUser = (e) => {
        e.preventDefault();
        console.log("updating user value");
        if (typeof user.roles === 'string') {
            user.roles = user.roles.split(',');
        }
        console.log(user);
        fetch(globalconstants.BASE_URL + '/user/update-user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(globalconstants.handleErrors)
        .then( response => response.json())
        .then( (updatedUser) => {
            console.log("Updated User")
            console.log(updatedUser);
            const updatedUsers = [];
            users.map( (u) => {
                if (u.userId === updatedUser.userId)
                    updatedUsers.push(updatedUser);
                else
                    updatedUsers.push(u);
            })
            // let updatedUsers = [...users];
            // updatedUsers = updatedUsers.map( (u) => {
            //     if (u.userId === updatedUser.userId) {
            //         console.log("Id matched!");
            //         return updatedUser;
            //     }
            //     return u;
            // });
            return updatedUsers;
        })
        .then( (updatedUsers) => {
            console.log("updated users");
            console.log(updatedUsers);
            setUsers(updatedUsers);
            setModal({...modal, ['open']: false});
        })
        .catch( response => {
            response.json().then(errorObj => 
                setModal({...modal, ['openSnackbar']: true, ['errorMessage']:errorObj.message})
                );
        });
    
    }

    const handleItemChange = (name) => (e) => {
        setUser({
            ...user,
            [name]: e.target.value
        });
    }

    const userEditForm = (user, fieldName) => (e) => {
        setUser(user); // setting user to current edited form
        setModal({...modal, ["open"]: true, ['fieldName']: fieldName}); // opens dialog
    }

    const deleteUser = (userId) => (e) => {
        fetch(globalconstants.BASE_URL + '/user/' + userId, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            console.log("User deleted successfully!");
            let updatedUsers = users.filter(u => u.userId !== userId);
            console.log("Users after deleting", updatedUsers);
            setUsers(updatedUsers);
        });
    }

    return (
        <div>
            <AlertDialog 
                open={modal.open}
                handleClose={handleModalClose}
                title="Update Detail"
                content={
                    <form onSubmit={updateUser}>
                        <FormControl fullWidth margin="normal">
                            <TextField 
                                onChange={handleItemChange(modal.fieldName)}
                                value={user[modal.fieldName] ? user[modal.fieldName].toString() : ''}
                                fullWidth
                            ></TextField>
                        </FormControl>
                        <FormGroup margin="normal">
                            <Button type="submit" variant="contained" color="primary">
                                Update
                            </Button>
                        </FormGroup>
                    </form>
                }
            />
            <Snackbar 
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={modal.openSnackbar}
                autoHideDuration={6000}
                onClose={() => setModal({...modal, ['openSnackbar']: false})}
                message={<span>{ modal.errorMessage }</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={() => setModal({...modal, ['openSnackbar']: false})}
                    >
                        <CloseIcon />
                    </IconButton>
                ]}

            />
            
            <Paper className={classes.root} style={{padding: 10}}>
                <Typography variant="h5">List of all Users</Typography>
                
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Username</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users.map( (user, index) => {
                                if (! user.roles.includes(globalconstants.SUPER_ADMIN)) {
                                    
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{ user.userId }</TableCell>
                                            <TableCell onClick={userEditForm(user, 'firstName')} title="Click to update">{ user.firstName }</TableCell>
                                            <TableCell onClick={userEditForm(user, 'lastName')}>{ user.lastName }</TableCell>
                                            <TableCell onClick={userEditForm(user, 'roles')}>{ user.roles.toString() }</TableCell>
                                            <TableCell onClick={userEditForm(user, 'username')}>{ user.username }</TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={deleteUser(user.userId)}                                                
                                                ><DeleteForever color="secondary" /></Button>
                                            </TableCell>
                                        </TableRow>
                                    );

                                }
                            })
                        }
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}


export default ViewUserList;