import React, { useState } from 'react';
import './App.css';
import CreateAppointment from './containers/CreateAppointment'
import CounterClinicAppBar from './components/AppBar/CounterClinicAppBar';
import Grid from '@material-ui/core/Grid';
import NavigationDrawer from './components/NavigationDrawer';
import { Route, BrowserRouter } from 'react-router-dom';

function App() {

  const routing = (
    <div className="App">
      <CounterClinicAppBar title="Create Appointment" />

      <div style={{ marginTop: 20, padding: 30}}>
        <Grid container>
          <Grid container item xs={6}>
            <BrowserRouter>
              <div>
                  <Route exact path="/create-appointment" component={CreateAppointment}></Route>
              </div>
            </BrowserRouter>
          </Grid>
        </Grid>
      </div>
      
    </div>
    
  );

  return routing;
}

export default App;
