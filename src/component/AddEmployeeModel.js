import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import SnackBar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
// import { Formik } from 'formik';
// import * as Yup from 'yup';

export class AddEmployeeModel extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            age: '',
            joiningdate: '',
            firstname: '',
            lastname: '',
            email:'',
            title: '',
            snackbaropen: false,
            snackbarmsg: ''
        }
    }
    snackBarClose = e => {
        this.setState({ snackbaropen: false })
    }
    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        let user = { id: this.state.id, age: this.state.age,email:this.state.email, joiningdate: this.state.joiningdate, firstname: this.state.firstname, lastname: this.state.lastname, title: this.state.title };
        const config = {
            headers: { 'Content-type': 'application/json' }
        }

        axios
            .post('http://localhost:9898/employee/add', user, config)
            .then(response => {
                this.setState({ snackbaropen: true, snackbarmsg: "Employee Added Sucessfully" })
                let result = response.data;
                console.log(result);
                //console.log(response)
                // alert("Employee Added SucessFully")
            })
            .catch(error => {
                this.setState({ snackbaropen: true, snackbarmsg: 'failed' })
                //console.log(error)
            })
    }
    render() {
        const { id, age, joiningdate, firstname,email, lastname, title } = this.state
        

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
                                Add Employee
              </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.submitHandler}>
                                <Form.Group controlId="formEmployeeid">
                                    <Form.Label>Id</Form.Label>
                                    <Form.Control name="id" value={id} type="text" required placeholder="Please Enter id" onChange={this.changeHandler} />
                                </Form.Group>
                                <Form.Group controlId="formEmployeeTitle">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control name="age" value={age} type="text" required placeholder="Please Enter Age" onChange={this.changeHandler} />
                                </Form.Group>
                                <Form.Group controlId="formEmployeeBody">
                                    <Form.Label>JoiningDate</Form.Label>
                                    <Form.Control name="joiningdate" value={joiningdate} type="date" required placeholder="Please Enter JoiningDate" onChange={this.changeHandler} />
                                </Form.Group>
                                <Form.Group controlId="formEmployeeBody">
                                    <Form.Label>FirstName</Form.Label>
                                    <Form.Control name="firstname" value={firstname} type="text" required placeholder="Please Enter firstname" onChange={this.changeHandler} />
                                </Form.Group>
                                <Form.Group controlId="formEmployeeLastName">
                                    <Form.Label>LastName</Form.Label>
                                    <Form.Control name="lastname" value={lastname} type="text" required placeholder="Please Enter lastname" onChange={this.changeHandler} />
                                </Form.Group>
                                <Form.Group controlId="formEmployeeEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control name="email" value={email} type="text" required placeholder="Please Enter email" onChange={this.changeHandler} />
                                </Form.Group>
                                <Form.Group controlId="formEmployeeTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control name="title" value={title} type="text" required placeholder="Please Enter title" onChange={this.changeHandler} />
                                </Form.Group>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" required label="Check me out" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Add Employee
                    </Button>
                            </Form>

                        </Modal.Body>
                        <Modal.Footer>
                            {/* when you click on close Button then in Department.js  function will called AddEmployeeModelClose and make addEmployeeModelShow to false,  */}
                            <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                        </Modal.Footer>
                    </Modal>
            </div>
        )
    }
}

export default AddEmployeeModel
