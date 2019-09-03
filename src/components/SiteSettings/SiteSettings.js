import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import * as globalconstants from '../../global-constants';
import {
    Button,
    FormControl,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@material-ui/core';
import AlertDialog from '../AlertDialog';
import {DeleteForever, Edit} from '@material-ui/icons';

function EditSettingForm(props) {

    const [selectedSetting, setSelectedSetting] = useState({
        settingId: props.settingId, 
        settingName: props.settingName, 
        settingValue: props.settingValue
    });

    const handleChange = (name) => e => {
        setSelectedSetting({
            ...selectedSetting,
            [name]: e.target.value
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        props.updateSetting(selectedSetting);
    }

    return (
        <form autoComplete="off" onSubmit={handleFormSubmit}>
            <FormControl fullWidth margin="normal">
                <TextField 
                    fullWidth
                    id="setting-value"
                    name="settingValue"
                    value={selectedSetting.settingValue}
                    label={selectedSetting.settingName}
                    onChange={handleChange("settingValue")}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <Button variant="contained" color="primary" type="submit">Update Setting</Button>
            </FormControl>
        </form>
    );
}

EditSettingForm.propTypes = {
    settingId: PropTypes.number.isRequired,
    settingName: PropTypes.string.isRequired,
    settingValue: PropTypes.string.isRequired,
    updateSetting: PropTypes.func.isRequired
}

function SiteSettings(props) {

    useEffect(() => {
        fetchSettings();
    }, []);

    const [settings, setSettings] = useState([]);

    const fetchSettings = () => {
        fetch(globalconstants.API.fetchSettingsUrl)
        .then(globalconstants.handleErrors)
        .then(response => response.json())
        .then(settings => {
            console.log("Retrieved settings: ", settings);
            setSettings(settings);
        });
    }

    const [dialog, setDialog] = useState({open: false, title: 'Update Dialog', content: {}});

    const classes = globalconstants.useStyles();

    const handleSettingFormSubmit = (selectedSetting) => {
        console.log("Editing setting: ", selectedSetting);
        fetch(globalconstants.API.updateSettingUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem(globalconstants.ACCESS_TOKEN)
            },
            body: JSON.stringify(selectedSetting)
        })
        .then(globalconstants.handleErrors)
        .then(response => response.json())
        .then(updatedSetting => {
            console.log("Updated Setting:", updatedSetting);
            const updatedSettings = settings.reduce( (prev, curr) => {
                if (curr.settingId === selectedSetting.settingId) {
                    prev.push(selectedSetting);
                    return prev;
                }
                prev.push(curr);
                return prev;
            }, [] );
            console.log("Updated Settings: ", updatedSettings);
            setSettings(updatedSettings);
        });
    }
    

    const handleSettingEdit = (setting) => (e) => {
        console.log("Setting to edit: ", setting);
        setDialog({
            open: true,
            title: `Update Setting: ${setting.settingName}`,
            content: <EditSettingForm 
                settingId={setting.settingId}
                settingName={setting.settingName}
                settingValue={setting.settingValue}
                updateSetting={handleSettingFormSubmit}
            />,
        });
    }

    const handleDelete = (setting) => (e) => {
        fetch(`${globalconstants.API.deleteSettingUrl}?settingId=${setting.settingId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem(globalconstants.ACCESS_TOKEN),
            }
        })
        .then(globalconstants.handleErrors)
        .then(response => {
            console.log("Setting deleted successfully!");
            setSettings(settings.reduce( (prev, curr) => {
                if (curr.settingId === setting.settingId) {
                    return prev;
                }
                prev.push(curr);
                return prev;
            }, []));
        })
        .catch(error => {
            console.log("Error encountered while trying to delete the setting.", error);
        })
    }

    return (
        <div>
            <AlertDialog 
                open={dialog.open}
                title={dialog.title}
                content={dialog.content}
                handleClose={() => setDialog({...dialog, open: false})}
            />
            
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell><Typography variant="body1">Setting Name</Typography></TableCell>
                        <TableCell><Typography variant="body1">Setting Value</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        settings.map( (setting, index) => (
                            <TableRow key={index}>
                                <TableCell>{setting.settingName}</TableCell>
                                <TableCell>{setting.settingValue}</TableCell>
                                <TableCell><Button onClick={handleSettingEdit(setting)}><Edit /></Button></TableCell>
                                <TableCell><Button onClick={handleDelete(setting)}><DeleteForever /></Button></TableCell>
                            </TableRow>
                        ))
                    }
                    
                </TableBody>
            </Table>
        </div>
    );
}

export default SiteSettings;