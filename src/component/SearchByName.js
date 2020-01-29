import React, { Component } from 'react'
import { Table, ButtonToolbar, Button } from 'react-bootstrap'
import axios from 'axios'
import { AddEmployeeModel } from './AddEmployeeModel';
import { EditEmployeeModel } from './EditEmployeeModel';
export class SearchByName extends Component {
    constructor(props) {
        super(props)

        this.state = {
            emps: [],
            query: '',
            addEmployeeModelShow: false,
            editEmployeeModelShow: false,
            errorMsg: '',
            message: ''
        }
        this.cancel = '';
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleOnInputChange = (event) => {
        const query = event.target.value;
        this.setState({ query, errorMsg: '' }, () => {
            this.fetchSearchResults(query);
        });
    };

    fetchSearchResults(keyword) {
        if (this.cancel) {
            console.log("chandra")
            this.cancel.cancel();
        }
        this.cancel = axios.CancelToken.source();
        if (keyword.length !== 0) {
            axios.get('http://localhost:9898/employee/name/' + keyword, { cancelToken: this.cancel.token })
                .then(response => {
                    const resultNotFoundMsg = !response.data.length
                        ? 'There are no more search results. Please try a new search'
                        : '';
                    this.setState({
                        emps: response.data,
                        errorMsg: resultNotFoundMsg
                    })
                }).catch(error => {
                    if (axios.isCancel(error) || error) {
                        this.setState({
                            emps: [],
                            errorMsg: 'Failed to fetch the data. Please check network'
                        })
                    }
                }

                )

        }
        else {
            this.setState({
                emps: []
            })
        }

    }

    deleteUser(id) {
        if (window.confirm("Are You Sure TO Delete??")) {
            const config = {
                headers: { 'Content-type': 'application/json' }
            }
            axios
                .delete('http://localhost:9898/employee/delete/' + id, config)
                .then(response => {
                    this.setState({ snackbaropen: true, snackbarmsg: "User Deleted Sucessfully" })
                    console.log(response);
                })
                .catch(error => {
                    this.setState({ snackbaropen: true, snackbarmsg: 'failed' })
                    //console.log(error)
                })
        }
    }

    render() {
        const { emps, id, age, query, joiningdate, firstname, lastname, email, title, errorMsg } = this.state

        let AddEmployeeModelClose = () => this.setState({ addEmployeeModelShow: false })
        let EditEmployeeModelClose = () => this.setState({ editEmployeeModelShow: false })

        return (
            <React.Fragment>
                <label className="search-label" htmlFor="search-input">
                    <input
                        type="text"
                        name="query"
                        value={query}
                        id="search-input"
                        placeholder="Search..."
                        onChange={this.handleOnInputChange}
                    />
                    <i className="fa fa-search " aria-hidden="true" />
                </label>

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
                                            onClick={() => this.setState({
                                                editEmployeeModelShow: true, id: emp.id, age: emp.age,
                                                firstname: emp.firstname, lastname: emp.lastname, email: emp.email,
                                                joiningdate: emp.joiningdate, title: emp.title
                                            })}
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
                </React.Fragment>
        )
    }
}

export default SearchByName
