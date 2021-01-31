import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Modal from './layout/Modal';
import {getGroupUsers} from '../utilities/api';

class MembersModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            leaveGroupModal: false,
            inviteModal: false,
            members: []
        }
        this.loadMembers = this.loadMembers.bind(this);
    }

    loadMembers() {
        getGroupUsers(this.props.groupId)
            .then(({data}) => {
                this.setState({
                    members: data.data.groups
                });
            })
            .catch(e => {
                //TODO: Handle catch
            });
    }

    componentDidMount() {
        this.loadMembers();
    }

    render() {
        return (
            <Modal
                title="Member List"
                onClose={this.props.onClose}
                footer={false}
            >
                {this.state.members.map((member) => {
                    return (
                        <li
                            key={member.id}
                        >
                            Name: {member.name}, Email: {member.email}
                        </li>
                    );
                })}
            </Modal>
        );
    }
}

export default MembersModal;

MembersModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    groupId: PropTypes.any.isRequired
}
