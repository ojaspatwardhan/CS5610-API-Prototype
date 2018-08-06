import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';
import qs from 'qs';
import AppointmentList from './AppointmentList';

export default class Appointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: {}
    };
    this.getAccessToken = this.getAccessToken.bind(this);
    this.setAccessToken = this.setAccessToken.bind(this);
    this.testFunction = this.testFunction.bind(this);
  }

  getAccessToken() {
    console.log("Inside handleClick");
    fetch("https://sandbox-identity.onsched.com/connect/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: qs.stringify({
        grant_type: 'client_credentials',
        client_id: 'c.498acd04',
        client_secret: 'nQLNJuVKp6GdiWrHHWlT',
        scope: 'OnSchedApi'
      })
    }).then(response => response.json()).then(token => this.setState({token: token}, this.setAccessToken));
  }

  setAccessToken() {
    this.setState({accessToken: this.state.token.access_token}, this.testFunction);
  }

  getAPI = () => {
    fetch("https://sandbox-api.onsched.com/consumer/v1/appointments?status=RS", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.state.accessToken
      }
    }).then(response => response.json()).then(appointments => this.setState({appointments: appointments}, this.testFunction))
  }

  testFunction() {
    // console.log(this.state.accessToken)
  }

  render() {
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <button type="button" className="btn btn-md btn-outline-primary" onClick={this.getAccessToken}>Fetch Token</button>
          </div>
        </div>
        <div className="row" style = {{marginTop: 5}}>
          <div className="col-md-12">
            <button type="button" className="btn btn-md btn-outline-info" onClick={this.getAPI}>Fetch Appointments</button>
          </div>
        </div>
        <div className="row" style = {{marginTop: 10}}>
          <div className="col-md-12">
            <Router>
              <div>
                <Link to="/appointments/data">Show Appointments</Link>
                <Route path="/appointments/data" render = {() => <AppointmentList appointments = {this.state.appointments.data} accessToken = {this.state.accessToken} />} />
              </div>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}
