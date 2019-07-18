import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import  uuidv4  from 'uuid/v4';

function AlertDialog(props) {

  const userActions = (userActions) => {
    if (userActions) {
      return userActions.map( (action) => (
        <Button key={uuidv4()} 
          onClick={action.perform} 
          color={action.color}>
            {action.text}
        </Button>
      ));
    }
    
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          {props.content}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Close
          </Button>
          { userActions(props.userActions) }
        </DialogActions>
      </Dialog>
    </div>
  );
}

AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.any.isRequired
}


export default AlertDialog;