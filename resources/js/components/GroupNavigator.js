import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import AddGroupModal from './AddGroupModal';
import Group from "./Group";

class GroupNavigator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddGroupModal: false
        }
        this.showAddGroupModal = this.showAddGroupModal.bind(this);
    }

    showAddGroupModal(show) {
        this.setState({showAddGroupModal: show});
    }

    render() {
        return (
            <Fragment>
                {this.props.groups.map((group) => {
                    return (
                        <div
                            className="ml-5 mt-2 mb-2"

                            key={group.id}
                        >
                            <Group
                                group={group}
                                currentGroupId={this.props.currentGroupId}
                                selectGroup={this.props.selectGroup}
                                showInviteUserModal={this.props.showInviteUserModal}
                                showLeaveGroupModal={this.props.showLeaveGroupModal}
                                showMembersListModal={this.props.showMembersListModal}
                            />
                        </div>
                    );
                })}
                <div className="ml-5 mt-2 mb-2">
                    <button
                        type="button"
                        className="btn btn-outline-secondary add-group-button rounded-circle"
                        onClick={() => this.showAddGroupModal(true)}
                    >
                        <i className="fa fa-plus"/>
                    </button>
                </div>
                {this.state.showAddGroupModal &&
                <AddGroupModal
                    onClose={() => this.showAddGroupModal(false)}
                    loadGroups={this.props.loadGroups}
                />
                }
            </Fragment>
        );
    }
}

export default GroupNavigator;

GroupNavigator.propTypes = {
    groups: PropTypes.any,
    currentGroupId: PropTypes.any,
    selectGroup: PropTypes.func.isRequired,
    loadGroups: PropTypes.func.isRequired,
    showInviteUserModal: PropTypes.func.isRequired,
    showMembersListModal: PropTypes.func.isRequired,
    showLeaveGroupModal: PropTypes.func.isRequired
}
