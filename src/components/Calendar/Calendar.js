import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import AlertDialog from '../AlertDialog';
import { FormControl, TextField, Button, Select, MenuItem, InputLabel } from '@material-ui/core';
import moment from 'moment';
import * as globalconstants from '../../global-constants';

/* 
    Mocked Data
*/
const slots = [
    {
        slotId: 1,
        startTime: '00:00',
        endTime: '01:00'
    },
    {
        slotId: 2,
        startTime: '01:01',
        endTime: '02:00'
    },
    {
        slotId: 3,
        startTime: '02:01',
        endTime: '03:00'
    },
    {
        slotId: 4,
        startTime: '03:01',
        endTime: '04:00'
    }
];

function CreateEvent(props) {
    const [formData, setFormData] = useState({
        title: '',
        slot: {},
        startDate: props.startDate,
        endDate: props.endDate,
        startTime: props.startTime,
        endTime: props.endTime
    });

    const handleChange = (name) => (e) => {
        let value = e.target.value;
        // console.log("Selected value: ", value);
        setFormData({...formData, [name]:value});
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        props.createEvent(formData);
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <FormControl fullWidth margin="normal">
                <TextField fullWidth variant="outlined"
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    label="Title"
                    onChange={handleChange("title")}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <TextField fullWidth variant="outlined" 
                    id="appointment-date"
                    name="appointmentDate"
                    type="date"
                    value={formData.startDate}
                    label="Appointment Date"
                    onChange={handleChange('appointmentDate')}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="slot-selection">
                    Select Appointment Slot
                </InputLabel>
                <Select 
                    id="slot-selection"
                    name="slot"
                    value={formData.slot} 
                    onChange={handleChange("slot")}
                    variant="outlined"
                    label="Select Appointment Slot"
                    fullWidth
                >
                    
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        slots.map( (slot,index) => (
                            <MenuItem key={index} value={slot}>
                                { moment(slot.startTime, 'hh:mm').format('hh:mm a') } - { moment(slot.endTime, 'hh:mm').format('hh:mm a') }
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            {/* <FormControl fullWidth margin="normal">
                <TextField fullWidth variant="outlined"
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    label="Title"
                    onChange={handleChange("title")}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <TextField 
                    id="start-date"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    label="Start Date"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange("startDate")}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <TextField fullWidth variant="outlined"
                    id="start-time"
                    name="startTime"
                    type="time"
                    label="Start Time"
                    fullWidth
                    value={formData.startTime}
                    onChange={handleChange("startTime")}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <TextField fullWidth variant="outlined" 
                    id="end-date"
                    name="endDate"
                    type="date"
                    label="End Date"
                    value={formData.endDate}
                    onChange={handleChange("endDate")}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <TextField fullWidth variant="outlined"
                    id="end-time"
                    name="endTime"
                    type="time"
                    label="End Time"
                    fullWidth
                    value={formData.endTime}
                    onChange={handleChange("endTime")}
                />
            </FormControl> */}
            <FormControl fullWidth margin="normal">
                <Button variant="contained" fullWidth 
                    type="submit"
                    color="primary"
                    >
                        Create Event
                </Button>
            </FormControl>
        </form>
    );
}

function Calendar() {

    const [modal, setModal] = useState({
        open: false,
        handleClose: () => setModal({...modal, ['open']:false}),
        title: '',
        content: <CreateEvent startDate={'2019-07-04'} />
    });

    const [selectedEvent, setSelectedEvent] = useState({});
    const [events, setEvents] = useState([
        { // this object will be "parsed" into an Event Object
          id: 123,
          title: 'The Title', // a property!
          start: '2019-07-12', // a property!
          end: '2019-07-13' // a property! ** see important note below about 'end' **
        }
    ]);

    const handleEventClick = (eventModel) => {
        console.log("Event Clicked: ", eventModel);
        console.log("Event Clicked: ", eventModel.event);
        let event = eventModel.event;
        setModal({
            ...modal, 
            open: true,
            title: "Update Appointment",
            content: <CreateEvent 
                title={event.title}
                startDate={moment(event.start).format(globalconstants.LOCAL_DATE_FORMAT)}
                startTime={moment(event.start).format(globalconstants.LOCAL_TIME_FORMAT)}
                endDate={moment(event.end).format(globalconstants.LOCAL_DATE_FORMAT)}
                endTime={moment(event.end).format(globalconstants.LOCAL_TIME_FORMAT)}
            />
        });
    }

    const createEvent = (formData) => {
        console.log("Create Event Form Data: ", formData);
        // call server to create new event

        // add event to the list of events
        setEvents([...events, {
            title: formData.title, 
            start: moment(formData.startDate + ' ' + formData.slot.startTime).format(), 
            end: moment(formData.startDate + ' ' + formData.slot.endTime).format()
        }]);
        setModal({...modal, open: false});
    }

    const handleDateClick = (date) => {
        console.log(date);
        setModal({
            ...modal, 
            open:true, 
            title: 'Create Event', 
            content: <CreateEvent 
                startDate={date.startStr} 
                startTime={moment().format('hh:mm')}
                endDate={date.endStr}
                endTime={moment().add(1, 'hour').format('hh:mm')}
                createEvent={createEvent}
            />
        });
    }

    const handleEventDrop = (event) => {
        console.log(event);
        // call server to update the selected event
    }

    return (
        <div id="full-calendar">
            <AlertDialog
                open={modal.open}
                handleClose={modal.handleClose}
                title={modal.title}
                content={modal.content}
            />
            <FullCalendar 
                defaultView="dayGridMonth"
                plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin]}
                header={{ center:'dayGridMonth,timeGridWeek' }}
                editable={true}
                selectable={true}
                events={events}
                eventClick={handleEventClick}
                select={handleDateClick}
                eventDrop={handleEventDrop}
            />
        </div>
    )
    
  
  }

export default Calendar;