import React, { Component, useState, theme } from 'react'
import { Drawer, List, ListItem, ListItemText, Typography, IconButton } from '@material-ui/core';
import * as constants from './NavigationDrawerStyle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export default function NavigationDrawer({isOpen = false, handleDrawerClose}) {
    const classes = constants.useStyles();
    return (
        <Drawer open={isOpen} className={classes.drawer}
            variant="persistent"
            anchor="left"
            classes={{
                paper: classes.drawerPaper
            }}>
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose} 
                    edge="start"
                    color="inherit">
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <List>
                <ListItem>
                    <ListItemText primary="Item One"></ListItemText>
                </ListItem>
            </List>
        </Drawer>
    );
    
}
