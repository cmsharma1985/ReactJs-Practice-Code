import React, { Component } from 'react'
import { Table, ButtonToolbar, Button } from 'react-bootstrap'
import axios from 'axios'
import { AddEmployeeModel } from './AddEmployeeModel';
import { EditEmployeeModel } from './EditEmployeeModel';


export class Employee extends Component {
    constructor(props) {
        super(props)

        this.state = {
            emps: [],
            addEmployeeModelShow: false,
            editEmployeeModelShow: false,
            errorMsg: '',
        }
    }


    refreshList() {
        axios.get('http://localhost:9898/employee').then(response => {
            console.log(response)
            this.setState({ emps: response.data })
        }).catch(error => {
            this.setState({ errorMsg: 'Error retriveing data' })
        })
    }
    componentDidMount() {
        this.refreshList()
    }  
    
    deleteUser(id) {
        if (window.confirm("Are You Sure TO Delete??")) {
            const config = {
                headers: { 'Content-type': 'application/json' }
            }
            axios
                .delete('http://localhost:9898/employee/delete/' + id, config)
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
    }

    render() {
        const { emps, id, age, joiningdate, firstname, lastname,email, title, errorMsg } = this.state

        let AddEmployeeModelClose = () => this.setState({ addEmployeeModelShow: false })
        let EditEmployeeModelClose = () => this.setState({ editEmployeeModelShow: false })

        return (
            <div>
                <Table className="mt-4" striped bordered hover >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>AGE</th>
                            <th>JOINING DATE</th>
                            <th>FIRST NAME</th>
                            <th>LAST NAME</th>
                            <th>EMAIL</th>
                            <th>TITLE</th>
                            <th>OPTIONS </th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.length ? emps.map(emp =>
                            <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td> {emp.age} </td>
                                <td> {emp.joiningdate} </td>
                                <td> {emp.firstname} </td>
                                <td> {emp.lastname} </td>
                                <td> {emp.email} </td>
                                <td> {emp.title} </td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2"
                                            variant="info"
                                            onClick={() => this.setState({ editEmployeeModelShow: true, id: emp.id, age: emp.age,
                                                 firstname: emp.firstname, lastname: emp.lastname,email:emp.email,
                                                  joiningdate: emp.joiningdate, title: emp.title })}
                                        >Edit</Button>

                                        <Button className="mr-6"
                                            variant="danger"
                                            onClick={() => this.deleteUser(emp.id)}
                                        >Delete</Button>

                                        <EditEmployeeModel
                                            show={this.state.editEmployeeModelShow}
                                            onHide={EditEmployeeModelClose}
                                            id={id}
                                            age={age}
                                            joiningdate={joiningdate}
                                            firstname={firstname}
                                            lastname={lastname}
                                            email={email}
                                            title={title}
                                        />
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        ) : null
                        }
                        {errorMsg ? <div>{errorMsg}</div> : null}

                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button
                        variant="primary"
                        onClick={() => this.setState({ addEmployeeModelShow: true })}
                    >Add User</Button>
                    <AddEmployeeModel
                        show={this.state.addEmployeeModelShow}
                        onHide={AddEmployeeModelClose}
                    />
                </ButtonToolbar>
            </div>
        )
    }
}

export default Employee
