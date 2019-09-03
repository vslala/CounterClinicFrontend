import React from 'react';
import {Paper} from "@material-ui/core";
import {useSelector} from 'react-redux';
import * as globalconstants from "../../global-constants";


export default function QRCode() {

    const qrCode = useSelector(state => state.qrCode);

    if (qrCode.qrCodeUrlPath) {
        return (
            <Paper>
                <img src={globalconstants.BASE_URL + '/' + qrCode.qrCodeUrlPath} />
            </Paper>
        );
    }

    return (
        <Paper>
            QRCode will be displayed here.
        </Paper>
    );
}