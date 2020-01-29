import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
export class Navigation extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto">
                    <Nav.Link className="d-inline p-2 bg-dark text-white" href="/">Home</Nav.Link>
                    <Nav.Link className="d-inline p-2 bg-dark text-white" href="/employee">Employee</Nav.Link>
                    <Nav.Link className="d-inline p-2 bg-dark text-white" href="/validation">ValidatedLogin</Nav.Link>
                    <Nav.Link className="d-inline p-2 bg-dark text-white" href="/SearchByName">SearchByName</Nav.Link>

                </Nav>
            </Navbar>
        )
    }
}

export default Navigation
