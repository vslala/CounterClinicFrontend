import React from 'react';
import { Paper, Input, Grid } from '@material-ui/core';
import * as globalconstants from '../../global-constants';

function FileUpload() {

    const classes = globalconstants.useStyles();

    const handleChange = (e) => {
        let files = e.target.files;
        console.log("Files Selected: ", files[0]);
        const data = new FormData();
        data.append('file', files[0]);
        console.log(data);
    }

    return (
        <Grid container justify="center">
            <Paper className = {classes.root}>

                <img src="" />
                <Input fullWidth type="file" id="file-upload" name="fileUpload" onChange={handleChange} />
            </Paper>
        </Grid>
    );
}

export default FileUpload;