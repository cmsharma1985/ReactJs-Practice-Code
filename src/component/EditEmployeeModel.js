import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import SnackBar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'

export class EditEmployeeModel extends Component {
    constructor(props) {
        super(props)

        this.state = {
            snackbaropen: false,
            snackbarmsg: ''
        }
    }
    snackBarClose = e => {
        this.setState({ snackbaropen: false })
    }

    submitHandler = e => {
        e.preventDefault()
        let user = {
            id: e.target.id.value,
            age: e.target.age.value,
            joiningdate: e.target.joiningdate.value,
            firstname: e.target.firstname.value,
            lastname: e.target.lastname.value,
            title: e.target.title.value,
            email:e.target.email.value
        };
        
        const config = {
            headers: { 'Content-type': 'application/json' }
        }

        axios
            .put('http://localhost:9898/employee/update/', user, config)
            .then(response => {
                this.setState({ snackbaropen: true, snackbarmsg: "User Updated Sucessfully" })
                // let result = response.data;
                console.log(response);
                //console.log(response)
                // alert("User Added SucessFully")
            })
            .catch(error => {
                this.setState({ snackbaropen: true, snackbarmsg: 'failed' })
                //console.log(error)
            })
    }
    render() {
        // const { userid, title, body, id } = this.state
        return (
            <div className="container">
                <SnackBar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.state.snackbaropen}
                    autoHideDuration={3000}
                    onClose={this.snackBarClose}
                    message={<span id="message-id">{this.state.snackbarmsg}</span>}
                    action={[
                        <IconButton
                            key="close"
                            arial-label="close"
                            color="inherit"
                            onClick={this.snackBarClose}>
                            x
                        </IconButton>
                    ]}
                />
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update User
              </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.submitHandler}>
                            <Form.Group controlId="formEmployeeid">
                                <Form.Label>Id</Form.Label>
                                <Form.Control name="id" defaultValue={this.props.id} type="text" required placeholder="Please Enter id" />
                            </Form.Group>
                            <Form.Group controlId="formEmployeeTitle">
                                <Form.Label>Age</Form.Label>
                                <Form.Control name="age" defaultValue={this.props.age} type="text" required placeholder="Please Enter Age" />
                            </Form.Group>
                            <Form.Group controlId="formEmployeeBody">
                                <Form.Label>JoiningDate</Form.Label>
                                <Form.Control name="joiningdate" defaultValue={this.props.joiningdate} type="date" required placeholder="Please Enter JoiningDate" />
                            </Form.Group>
                            <Form.Group controlId="formEmployeeBody">
                                <Form.Label>FirstName</Form.Label>
                                <Form.Control name="firstname" defaultValue={this.props.firstname} type="text" required placeholder="Please Enter firstname" />
                            </Form.Group>
                            <Form.Group controlId="formEmployeeLastName">
                                <Form.Label>LastName</Form.Label>
                                <Form.Control name="lastname" defaultValue={this.props.lastname} type="text" required placeholder="Please Enter lastname" />
                            </Form.Group>
                            <Form.Group controlId="formEmployeeEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control name="email" defaultValue={this.props.email} type="text" required placeholder="Please Enter email"  />
                                </Form.Group>
                            <Form.Group controlId="formEmployeeTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control name="title" defaultValue={this.props.title} type="text" required placeholder="Please Enter title" />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" required label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Edit Employee
                    </Button>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        {/* when you click on close Button then in Department.js  function will called AddEmployeeModelClose and make addEmployeeModelShow to false,  */}
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div >
        )
    }
}

export default EditEmployeeModel
