import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Paper } from '@material-ui/core';
import * as globalconstants from '../../global-constants';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">{"QRCode: " + props.qrCode.qrCodeName}</DialogTitle>
        <DialogContent height={props.qrCode.height} >
          <img src={globalconstants.BASE_URL + '/' + props.qrCode.qrCodeUrlPath} />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}