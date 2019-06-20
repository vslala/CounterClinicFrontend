import React, { useState } from 'react';
import './App.css';
import CreateAppointment from './components/CreateAppointment'
import CounterClinicAppBar from './components/AppBar/CounterClinicAppBar';
import Grid from '@material-ui/core/Grid';
import NavigationDrawer from './components/NavigationDrawer';
import { Route, BrowserRouter } from 'react-router-dom';
import ViewAppointmentList from './components/ViewAppointmentList';

function App() {

  const routing = (
    <BrowserRouter>
    <div className="App">
      <CounterClinicAppBar title="Create Appointment" />

      <div style={{ marginTop: 20, padding: 30}}>
        <Grid container>
          <Grid container item xs={6}>
            
              <div>
                  <Route exact path="/create-appointment" component={CreateAppointment}></Route>
                  <Route exact path="/view-all-appointments" component={ViewAppointmentList}></Route>
              </div>
            
          </Grid>
        </Grid>
      </div>
      
    </div>
    </BrowserRouter>
    
  );

  return routing;
}

export default App;
