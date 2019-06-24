import React, { Component, useState, theme } from 'react'
import { Drawer, List, ListItem, ListItemText, Typography, IconButton } from '@material-ui/core';
import * as constants from './NavigationDrawerStyle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Link as Href, Route } from 'react-router-dom';

export default function NavigationDrawer({isOpen = false, handleDrawerClose, props}) {
    const classes = constants.useStyles();

    const navigateTo = (e) => {
        let href = e.currentTarget.dataset.href;
        console.log(href);

        window.location = href;
    }

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
                
                    {
                        [
                            {key: 1, text: "Create New Appointment", link: "/create-appointment"},
                            {key: 2, text: "View All Appointments", link: "/view-all-appointments"}
                        ].map( (navLink) => (
                            
                            <ListItem button data-href={navLink.link} key={navLink.key} 
                            onClick={navigateTo}>
                                <ListItemText primary={navLink.text}></ListItemText>
                            </ListItem>
                            
                            
                        ) )
                    }
                    
                
            </List>
        </Drawer>
    );
    
}
