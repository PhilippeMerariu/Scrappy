import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {getContents, getUserGroups} from '../utilities/api';
import Contents from './Contents';
import GroupNavigator from './GroupNavigator';
import {Spinner} from "react-bootstrap";
import InviteUserModal from "./InviteUserModal";
import MembersModal from "./MembersModal";
import Header from "./layout/Header";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            contents: [],
            currentGroupId: window.location.pathname.split("/").pop(),
            currentGroupName: '',
            loading: true,
            showInviteUserModal: false,
            showMembersListModal: false,
            showLeaveGroupModal: false,
            groupModalIdSelected: 0
        }

        this.setCurrentGroupId = this.setCurrentGroupId.bind(this);
        this.loadGroups = this.loadGroups.bind(this);
        this.loadContents = this.loadContents.bind(this);
        this.findGroupName = this.findGroupName.bind(this);
        this.showInviteUserModal = this.showInviteUserModal.bind(this);
        this.showMembersListModal = this.showMembersListModal.bind(this);
        this.showLeaveGroupModal = this.showLeaveGroupModal.bind(this);
        this.mount = this.mount.bind(this);
    }

    findGroupName(id, allGroups) {
        if (allGroups) {
            let i;
            for (i = 0; i < allGroups.length; i++) {
                if (allGroups[i].id === parseInt(id)) {
                    return allGroups[i].name
                }
            }
            return "no match"
        }
    }

    setCurrentGroupId(id) {
        this.setState({
            currentGroupId: id,
            currentGroupName: this.findGroupName(id, this.state.groups)
        });
        this.loadContents(id);
        window.history.pushState([], 'Container', '/h/' + id);
    }

    loadGroups() {
        getUserGroups()
            .then(({data}) => {
                this.setState({
                    groups: data.data.groups,
                    currentGroupName: this.findGroupName(this.state.currentGroupId, data.data.groups)
                });
            })
            .catch(e => {
                //TODO: Handle catch
            });
    }

    loadContents(id) {
        this.setState({loading: true});
        getContents(id)
            .then(({data}) => {
                this.setState({contents: data.data.contents, loading: false});
            })
            .catch(e => {
                //TODO: handle catch
            })
    }

    componentDidMount() {
        this.mount()
    }

    mount() {
        this.loadGroups();
        if (this.state.currentGroupId !== '0') {
            this.loadContents(this.state.currentGroupId);
        }
    }

    showInviteUserModal(show, groupId) {
        this.setState({showInviteUserModal: show, groupModalIdSelected: groupId});
    }

    showMembersListModal(show, groupId) {
        this.setState({showMembersListModal: show, groupModalIdSelected: groupId});
    }

    showLeaveGroupModal(show, groupId) {
        this.setState({showLeaveGroupModal: show, groupModalIdSelected: groupId})
    }

    render() {
        return (
            <Fragment>
                <Header mount={this.mount}/>
                <div className="row">
                    <div className="col-md-2 h-100 border-right">
                        <GroupNavigator
                            groups={this.state.groups}
                            currentGroupId={this.state.currentGroupId}
                            selectGroup={this.setCurrentGroupId}
                            loadGroups={this.loadGroups}
                            showInviteUserModal={this.showInviteUserModal}
                            showMembersListModal={this.showMembersListModal}
                            showLeaveGroupModal={this.showLeaveGroupModal}
                        />
                    </div>
                    {this.state.loading ?
                        <div className="spinner">
                            <Spinner animation="grow"/>
                        </div>
                        :
                        <div className="col ml-5">
                            <Contents
                                contents={this.state.contents}
                                currentGroupId={this.state.currentGroupId}
                                loadContents={this.loadContents}
                                currentGroupName={this.state.currentGroupName}
                                showInviteUserModal={this.showInviteUserModal}
                                showMembersListModal={this.showMembersListModal}
                                showLeaveGroupModal={this.showLeaveGroupModal}
                            />
                        </div>
                    }
                    {
                        this.state.showInviteUserModal &&
                        <InviteUserModal
                            groupId={this.state.groupModalIdSelected}
                            onClose={() => this.setState({showInviteUserModal: false})}
                        />
                    }
                    {
                        this.state.showMembersListModal &&
                        <MembersModal onClose={() => this.setState({showMembersListModal: false})}
                                      groupId={this.state.groupModalIdSelected}/>
                    }

                </div>
            </Fragment>

        );
    }
}

export default Dashboard;

if (document.getElementById('dashboard')) {
    ReactDOM.render(<Dashboard/>, document.getElementById('dashboard'));
}
