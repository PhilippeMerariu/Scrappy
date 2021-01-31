import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Popover} from "react-bootstrap";

class SettingsPopover extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <Popover.Content>
                <div className="container">
                    <div className="row">
                        <Button
                            className="w-100 mb-1"
                            variant="outline-primary"
                            onClick={() => {
                                this.props.showInviteUserModal(true, this.props.groupId)
                            }}
                        >
                            Invite User
                        </Button>
                    </div>
                    <div className="row">
                        <Button
                            className="w-100 mb-1"
                            variant="outline-primary"
                            onClick={() => {
                                this.props.showMembersListModal(true, this.props.groupId)
                            }}>
                            Members List
                        </Button>
                    </div>
                    <div className="row">
                        <Button
                            className="w-100 mb-1"
                            variant="outline-danger"
                            onClick={() => {
                                this.props.showLeaveGroupModal(true, this.props.groupId)
                            }}>
                            Leave Group
                        </Button>
                    </div>
                </div>
            </Popover.Content>
        );
    }
}

export default SettingsPopover;

SettingsPopover.propTypes = {
    position: PropTypes.string,
    groupId: PropTypes.any.isRequired,
    showInviteUserModal: PropTypes.func.isRequired,
    showMembersListModal: PropTypes.func.isRequired,
    showLeaveGroupModal: PropTypes.func.isRequired
}
