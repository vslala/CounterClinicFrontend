import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Paper, Input, Grid, Button, Snackbar } from '@material-ui/core';
import * as globalconstants from '../../global-constants';

function FileUpload(props) {

    const classes = globalconstants.useStyles();

    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "File has been uploaded successfully!"
    });
    const [selectedFile, setSelectedFile] = useState({});

    const [setting, setSetting] = useState({});

    const fetchImage = (attachmentType) => {
        fetch(`${globalconstants.BASE_URL}/user/setting/${attachmentType}`)
        .then(globalconstants.handleErrors)
        .then(response => response.json())
        .then(fileSetting => {
            console.log(`File Setting for attachment type: ${attachmentType} is ${fileSetting}`);
            setSetting({
                settingName: fileSetting.settingName,
                settingValue: `${globalconstants.BASE_URL}/${fileSetting.settingValue}`
            });
        })
        .catch(error => {
            console.log("Error: ", error);
            setSetting({settingName: attachmentType, settingValue: 'https://via.placeholder.com/500?text=Upload Image'})
        });
    }

    useEffect(() => {
        fetchImage(props.attachmentType);
    }, [])

    const handleChange = (e) => {
        let files = e.target.files;
        console.log(files[0]);
        setSelectedFile(files[0]);
    }

    const handleFileUpload = () => {
        var fileData = new FormData();
        fileData.append('file', selectedFile);
        fileData.append('attachmentType', props.attachmentType);
        fetch(props.fileUploadUrl, {
            method: "POST",
            body: fileData
        })
        .then(response => response.json())
        .then(responseText => {
            console.log("Returned Response: ", responseText);
            setSnackbarState({...snackbarState, open: true});
        });
    }

    const uploadedImage = (selectedFile) => {
        console.log("Selected File Object: ", Object.keys(selectedFile).length);
        if (selectedFile.name) {
            return <img style={{maxWidth: '100%', height: 'auto'}} src={window.URL.createObjectURL(selectedFile)} />
        }
        return <img style={{maxWidth: '100%', height: 'auto'}} src={`${setting.settingValue}`} />
    }

    return (
        <Grid container justify="center">
            <Snackbar 
                open={snackbarState.open}
                message={snackbarState.message}
                anchorOrigin={{
                    horizontal: "center",
                    vertical: "bottom"
                }}
            />
            <Paper className = {classes.root}>
                { uploadedImage(selectedFile) }
                <Input fullWidth type="file" id="file-upload" name="fileUpload" onChange={handleChange} />
                <Button fullWidth variant="contained" onClick={handleFileUpload} >Upload</Button>
            </Paper>
        </Grid>
    );
}

FileUpload.propTypes = {
    fileUploadUrl: PropTypes.string.isRequired,
    attachmentType: PropTypes.string.isRequired
}

export default FileUpload;