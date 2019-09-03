import React from 'react';
import PrintProvider, {NoPrint, Print} from 'react-easy-print';
import AppointmentDetail from '../../components/ApointmentDetail';
import {Button} from '@material-ui/core';

export default function PrintAppointmentInfo(props) {

    return (
        <PrintProvider>
            <NoPrint>
        
                <Print single name="appointmentDetails">
                    <AppointmentDetail appointmentId={props.match.params.appointmentId} /> 
                         
                </Print>              
                <Button 
                        color="primary" 
                        variant="outlined"
                        onClick={() => window.print()}
                    >
                        Print Appointment
                </Button> 
            </NoPrint>
        </PrintProvider>
    );
}
