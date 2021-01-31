import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from "react-tooltip";
import {OverlayTrigger, Popover} from "react-bootstrap";
import SettingsPopover from "./layout/SettingsPopover";

class Group extends Component {

    constructor(props) {
        super(props);

        this.state = {
            style: 'rounded-circle zoom',
            showGroupSettings: false
        }

        this.onGroupClick = this.onGroupClick.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({showGroupSettings: false})
        }
    }

    onGroupClick(groupId) {
        this.props.selectGroup(groupId);
    }

    onContextMenu(e) {
        e.preventDefault()
        this.setState({showGroupSettings: true})
    }

    render() {
        return (
            <div ref={this.wrapperRef}>
                <OverlayTrigger
                    trigger="click"
                    placement="right"
                    show={this.state.showGroupSettings}
                    rootClose
                    overlay={
                        <Popover id="popover-basic">
                            <SettingsPopover
                                groupId={this.props.group.id}
                                showInviteUserModal={this.props.showInviteUserModal}
                                showLeaveGroupModal={this.props.showLeaveGroupModal}
                                showMembersListModal={this.props.showMembersListModal}/>
                        </Popover>
                    }>
                    <img
                        className={this.props.group.id === this.props.currentGroupId ? this.state.style + " border border-success border-3" : this.state.style}
                        src={this.props.group.profile_picture ? this.props.group.profile_picture.url : ''}
                        width="120"
                        height="120"
                        data-tip={this.props.group.name}
                        data-place="right"
                        onMouseEnter={() => this.setState({style: 'rounded-lg zoom'})}
                        onMouseLeave={() => this.setState({style: 'rounded-circle zoom'})}
                        onContextMenu={(e) => this.onContextMenu(e)}
                        onClick={() => this.onGroupClick(this.props.group.id)}
                        alt={"Group image"}/>
                </OverlayTrigger>
                <ReactTooltip/>
            </div>
        );
    }
}

export default Group;

Group.propTypes = {
    group: PropTypes.object.isRequired,
    currentGroupId: PropTypes.any.isRequired,
    selectGroup: PropTypes.func.isRequired,
    showInviteUserModal: PropTypes.func.isRequired,
    showMembersListModal: PropTypes.func.isRequired,
    showLeaveGroupModal: PropTypes.func.isRequired
}
