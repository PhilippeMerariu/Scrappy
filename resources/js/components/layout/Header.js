import React, {Component} from 'react';
import {Button, Form, FormControl, Nav, Navbar, NavDropdown, OverlayTrigger, Popover} from "react-bootstrap";
import {getUserInvites} from "../../utilities/api";
import InviteRow from "../InviteRow";
import PropTypes from 'prop-types';

class ContentModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            invites: []
        }

        this.getUserInvites = this.getUserInvites.bind(this);
    }

    getUserInvites() {
        getUserInvites()
            .then(({data}) => {
                this.setState({invites: data.data.invites});
            })
            .catch(e => {
                //TODO: handle catch
            });
    }

    componentDidMount() {
        this.getUserInvites();
    }

    render() {
        return (
            <Navbar bg="light" expand="lg" className="mb-4">
                <Navbar.Brand href="#home">Scrappy</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">

                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    <OverlayTrigger
                        trigger="click"
                        placement="bottom"
                        overlay={
                            <Popover id="popover-basic m-2">
                                <Popover.Content>
                                    {
                                        this.state.invites.map((invite) => {
                                            return <InviteRow invite={invite} refreshInvites={this.getUserInvites}
                                                              mount={this.props.mount}/>
                                        })
                                    }
                                </Popover.Content>
                            </Popover>
                        }>
                        <Button variant="outline-primary ml-3"><i className="fa fa-bell"/></Button>
                    </OverlayTrigger>
                    <NavDropdown id="basic-nav-dropdown" drop="left" title="⚙">
                        <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default ContentModal;

ContentModal.propTypes = {
    mount: PropTypes.func.isRequired
}
