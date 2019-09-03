import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import AlertDialog from '../AlertDialog';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from '@material-ui/core';
import moment from 'moment';
import * as globalconstants from '../../global-constants';
import uuidv4 from 'uuid/v4';

/* 
    Mocked Data
*/
// const slots = [
//     {
//         slotId: 1,
//         startTime: '00:00',
//         endTime: '01:00'
//     },
//     {
//         slotId: 2,
//         startTime: '01:01',
//         endTime: '02:00'
//     },
//     {
//         slotId: 3,
//         startTime: '02:01',
//         endTime: '03:00'
//     },
//     {
//         slotId: 4,
//         startTime: '03:01',
//         endTime: '04:00'
//     }
// ];

function CreateEvent(props) {
    const [formData, setFormData] = useState({
        id: props.id ? props.id : uuidv4(),
        title: props.title ? props.title : '',
        slot: props.slot ? props.slot : {},
        startDate: props.startDate,
        // endDate: props.endDate,
        // startTime: props.startTime,
        // endTime: props.endTime
    });

    const [slots, setSlots] = useState([]);
    useEffect(() => {
        props.fetchSlots(props.startDate).then(slots => {
            setSlots(slots);
        });
    }, []);

    const handleChange = (name) => (e) => {
        let value = e.target.value;
        setFormData({...formData, [name]:value});
        if (name === 'startDate') {
            props.fetchSlots(value).then(slots => {
                setSlots(slots);
            });
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        props.createEvent(formData);
    }

    return (
        <form onSubmit={handleFormSubmit} autoComplete="off">
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
                    id="start-date"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    label="Appointment Date"
                    onChange={handleChange('startDate')}
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
                        { props.buttonText ? props.buttonText : 'Create Event' }
                </Button>
                {
                    props.handleDelete ? (
                        <Button variant="contained" fullWidth
                            onClick={props.handleDelete}
                            color="secondary"
                            style={{marginTop: 5}}
                            >
                                { props.deleteBtnText ? props.deleteBtnText : 'Delete Event'}
                        </Button>
                    ) : null
                }
                
            </FormControl>
        </form>
    );
}

CreateEvent.propTypes = {
    fetchSlots: PropTypes.func.isRequired
}

function Calendar(props) {

    const [modal, setModal] = useState({
        open: false,
        handleClose: () => setModal({...modal, ['open']:false}),
        title: '',
        fetchSlots: props.fetchSlots,
        content: <CreateEvent startDate={moment().format(globalconstants.LOCAL_DATE_FORMAT)} fetchSlots={props.fetchSlots} />
    });

    // const [events, setEvents] = useState([
    //     { // this object will be "parsed" into an Event Object
    //       id: 123,
    //       title: 'The Title', // a property!
    //       start: '2019-07-12', // a property!
    //       end: '2019-07-13' // a property! ** see important note below about 'end' **
    //     }
    // ]);
    const [events, setEvents] = useState(props.events);

    const updateEvent = (formData) => {
        console.log("Update Event Fired!");
        console.log("Updating event: ", formData);
        const updatedEvent = {
            id: formData.id,
            title: formData.title,
            slot: formData.slot,
            start: moment(formData.startDate + ' ' + formData.slot.startTime).format(),
            end: moment(formData.startDate + ' ' + formData.slot.endTime).format()
        };
        console.log("updated event value: ", updatedEvent);
        setEvents( events.reduce( (accumulator, event) => {
            console.log("Reducing Array", event);
            if (event.id == formData.id) {
                accumulator.push(updatedEvent);
                return accumulator;
            } 
            accumulator.push(event);
            return accumulator;
        }, []));
        setModal({...modal, open: false});
    }

    const handleEventDelete = (event) => {
        console.log(event);
        // call server to delete the event

        // then update the events
        setEvents(events.filter(e => e.id != event.id));

        // then close the modal
        setModal({...modal, open: false});
    }

    const handleEventClick = (eventModel) => {
        console.log("Event Clicked: ", eventModel);
        console.log("Event Clicked: ", eventModel.event);
        let event = eventModel.event;
        setModal({
            ...modal, 
            open: true,
            title: "Update Appointment",
            content: <CreateEvent 
                id={event.id}
                title={event.title}
                fetchSlots={props.fetchSlots}
                slot={event.extendedProps.slot}
                startDate={moment(event.start).format(globalconstants.LOCAL_DATE_FORMAT)}
                buttonText="Update Event"
                createEvent={updateEvent}
                handleDelete={() => handleEventDelete(event)}
            />
        });
    }

    const createEvent = (formData) => {
        console.log("Create Event Form Data: ", formData);
        // call server to create new event 

        // update the events state
        // add event to the list of events
        setEvents([...events, {
            id: formData.id,
            title: formData.title, 
            slot: formData.slot,
            start: moment(formData.startDate + ' ' + formData.slot.startTime).format(), 
            end: moment(formData.startDate + ' ' + formData.slot.endTime).format()
        }]);

        // then close the modal
        setModal({...modal, open: false});
    }

    const handleDateClick = (date) => {
        console.log(date);
        setModal({
            ...modal, 
            open:true, 
            title: 'Create Appointment', 
            content: <CreateEvent 
                startDate={date.startStr}
                fetchSlots={props.fetchSlots}
                createEvent={createEvent}
            />
        });
    }

    const handleEventDrop = (dropEvent) => {
        console.log(dropEvent);
        console.log("Dropped Event:", dropEvent.event);
        // crete form data object
        let formData = {
            id: dropEvent.event.id,
            title: dropEvent.event.title,
            slot: dropEvent.event.extendedProps.slot,
            startDate: moment(dropEvent.event.start).format(globalconstants.LOCAL_DATE_FORMAT)
        };
        // call server to update the selected event

        // then update the events state
        updateEvent(formData);
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
                events={props.events}
                eventClick={handleEventClick}
                select={handleDateClick}
                eventDrop={handleEventDrop}
            />
        </div>
    )
    
  
  }

Calendar.propTypes = {
    events: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchSlots: PropTypes.func.isRequired
}

export default Calendar;