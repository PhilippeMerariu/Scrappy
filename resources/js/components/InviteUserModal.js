import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from './layout/Modal';
import {postInvite} from "../utilities/api";

class InviteUserModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            response: "",
            email: ""
        }

        this.onSend = this.onSend.bind(this);
    }

    onSend() {
        console.log(this.props.groupId);
        postInvite(this.props.groupId, this.state.email)
            .then(({data}) => {
                this.setState({response: data.message})
            })
            .catch(e => {
                //TODO: Handle catch
            });
    }

    render() {
        return (
            <Modal
                title="Invite user"
                onClose={this.props.onClose}
                footer={true}
                onSend={this.onSend}
            >
                <form>
                    <div className="form-group">
                        <label>Enter user email</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.nameValue}
                            onChange={(e) => {
                                this.setState({email: e.target.value})
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <p>{this.state.response}</p>
                    </div>
                </form>
            </Modal>
        );
    }
}

export default InviteUserModal;

InviteUserModal.propTypes = {
    groupId: PropTypes.any,
    onClose: PropTypes.func.isRequired
}
