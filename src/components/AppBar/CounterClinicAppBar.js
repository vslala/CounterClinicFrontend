import React, {useCallback, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NavigationDrawer from '../NavigationDrawer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }),
);

export default function CounterClinicAppBar(props) {
    console.log("Inside Navigation Bar");
    const classes = useStyles();
    const [drawerState, setDrawerState] = useState({isOpen: false});

    const toggleDrawer = useCallback( () => {
      setDrawerState( (oldState) => {
        console.log("Old State: " + oldState.isOpen);
        let newState = {...oldState, ["isOpen"]: !oldState.isOpen};
        console.log("New State: " + newState.isOpen);
        return newState;
      });
    });

    const handleDrawerClose = () => {
        console.log("Closing navigation drawer");
      setDrawerState({...drawerState, isOpen: false});
    }

    return (
        <div className={classes.root}>
            <NavigationDrawer 
              history={props.history}
              isOpen={drawerState.isOpen} 
              handleDrawerClose={handleDrawerClose}
              navLinks={props.navLinks}
              />
            <AppBar>
                <Toolbar>
                    <IconButton className={classes.menuButton}
                        edge="start"
                        color="inherit"
                        aria-label="Menu"
                        onClick={toggleDrawer}>
                            <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        { props.title }
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}