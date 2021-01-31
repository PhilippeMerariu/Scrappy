import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from "react-bootstrap";
import {patchInvite} from "../utilities/api";

class InviteRow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            invites: []
        }

        this.patchInvite = this.patchInvite.bind(this);
    }

    patchInvite(status) {
        patchInvite(this.props.invite.id, status)
            .then(({data}) => {
                if (status === "approved") {
                    this.props.mount()
                }
                this.props.refreshInvites()
            })
            .catch(e => {
                //TODO: handle catch
            });
    }

    render() {
        return (
            <div className="row">
                <span className="ml-3 mr-3">Group name: {this.props.invite.group.name}</span>

                <Button
                    variant="outline-primary ml-3 mr-1 p-1"
                    onClick={() => this.patchInvite('approved')}
                >
                    <i className="fa fa-check"/>
                </Button>
                <Button
                    variant="outline-primary ml-1 mr-3 p-1"
                    onClick={() => this.patchInvite('rejected')}
                >
                    <i className="fa fa-times"/>
                </Button>
            </div>
        );
    }
}

export default InviteRow;

InviteRow.propTypes = {
    invite: PropTypes.object.isRequired,
    refreshInvites: PropTypes.func.isRequired,
    mount: PropTypes.func.isRequired
}
