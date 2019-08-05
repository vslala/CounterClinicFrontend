import React from 'react'
import { Drawer, List, ListItem, ListItemText, IconButton, Link, ClickAwayListener, Divider, ListItemIcon } from '@material-ui/core';
import * as constants from './NavigationDrawerStyle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { withRouter } from 'react-router-dom';
import * as globalconstants from '../../global-constants';
import { DashboardSharp } from '@material-ui/icons';
import uuidv4  from 'uuid/v4';

export default function NavigationDrawer(props) {
    const classes = constants.useStyles();

    const navigateTo = (e) => {
        let href = e.currentTarget.dataset.href;
        console.log(href);

        // window.location = href;
        props.history.push(href);
    }

    const handleLogout = () => {
        localStorage.setItem(globalconstants.ACCESS_TOKEN, null);
        props.history.push("/login");
    }

    return (
        <ClickAwayListener onClickAway={() => {console.log("Click away listener activated!");}}>
            <Drawer open={props.isOpen} className={classes.drawer}
                variant="persistent"
                anchor="left"
                classes={{
                    paper: classes.drawerPaper
                }}>
                <div className={classes.drawerHeader}>
                    <IconButton onClick={props.handleDrawerClose} 
                        edge="start"
                        color="inherit">
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <List>
                    
                        {
                            props.navLinks.map( (navLink, index) => (
                                
                                [
                                <ListItem 
                                    button data-href={navLink.link} 
                                    key={uuidv4()} 
                                    onClick={navigateTo}
                                >
                                    <Link to={navLink.link} variant="body1">
                                        <ListItemText primary={navLink.text}></ListItemText>
                                    </Link>
                                </ListItem>,
                                <Divider key={uuidv4()} />
                                ]
                                
                                
                            ) )
                        }
                    <ListItem key={uuidv4()} button key={props.navLinks.length + 1} 
                        onClick={handleLogout}>
                            <Link variant="body1">
                                <ListItemText primary="Logout"></ListItemText>
                            </Link>
                    </ListItem>
                    
                </List>
            </Drawer>
        </ClickAwayListener>
    );
    
}
