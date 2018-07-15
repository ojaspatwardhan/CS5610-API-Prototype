import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';

export default class AppointmentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: []
    };
    this.testFunction = this.testFunction.bind(this);
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.getAppointments = this.getAppointments.bind(this);
  }

  componentDidMount() {
    this.setState({appointments: this.props.appointments}, this.testFunction)
  }

  deleteAppointment(id) {
    console.log(id);
    fetch("http://sandbox-api.onsched.com/consumer/v1/appointments/" + id + "/cancel", {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + this.props.accessToken
      }
    }).then(this.getAppointments);
  }

  getAppointments() {
    fetch("http://sandbox-api.onsched.com/consumer/v1/appointments?status=RS", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.accessToken
      }
    }).then(response => response.json())
    .then(appointments =>
      this.setState({appointments: appointments.data}, this.testFunction))
  }

  testFunction() {
    console.log(this.state.appointments)
  }

  render() {
    return(
      <div className="container-fluid">
        <div className="modal fade" id="appointmentModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Reserve Appointment</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12">
                      <input type="text" className="form-control" placeholder="First Name" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <input type="text" className="form-control" placeholder="Last Name" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <input type="date" className="form-control" placeholder="Start Date Time" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <input type="date" className="form-control" placeholder="End Date Time" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Booked By</th>
                  <th scope="col">Confirmation Number</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>
                {this.state.appointments.map((appointment, index) => {
                  return(
                    <tr key = {index}>
                      <th scope="row">{index}</th>
                      <td>{appointment.bookedBy}</td>
                      <td>{appointment.confirmationNumber}</td>
                      <td>{appointment.duration}</td>
                      <td>{appointment.time}</td>
                      <td><button className="btn btn-sm btn-outline-danger" onClick={() => this.deleteAppointment(appointment.id)}>Delete</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
      </div>
    );
  }
}
