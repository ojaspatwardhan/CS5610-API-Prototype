import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Appointment from './app/Appointment.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [
        {
          id:"0",
          message: "Welcome to react chatbot, what is your name?",
          trigger: "1"
        },
        {
          id: "1",
          user: true,
          end: false,
          trigger: "2"
        },
        {
          id: "2",
          message: "Hi {previousValue}, how's it going?",
          end: false,
          trigger: "3"
        },
        {
          id: "3",
          user: true,
          end: false
        }
      ]
    };
  }

  render() {
    return (
      <Router>
        <div className="container-fluid">
          <div className="row">
            <div className="col-6">
              <h2>Test Page</h2>
            </div>
            <div className="col-6">
              <Link to="/appointments">Appointments</Link>
              <Route path="/appointments" component={Appointment} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
