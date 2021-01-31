import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import {postContent} from '../utilities/api';
import AddContentModal from './AddContentModal';
import {Button, OverlayTrigger, Popover} from "react-bootstrap";
import ContentModal from "./ContentModal";
import SettingsPopover from "./layout/SettingsPopover";

class Contents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddContentModal: false,
            showSettingsModal: false,
            showContentModal: false,
            selectedUrl: ""
        }
        this.showSettingsModal = this.showSettingsModal.bind(this);
        this.showContentModal = this.showContentModal.bind(this);
    }

    showSettingsModal(show) {
        this.setState({showSettingsModal: show});
    }

    showContentModal(show, url) {
        this.setState({showContentModal: show, selectedUrl: url});
    }

    onChangeFile(event, caption) {
        event.stopPropagation();
        event.preventDefault();
        let file = event.target.files[0];

        postContent(this.props.currentGroupId, file, caption)
            .then(({data}) => {
                this.props.loadContents(this.props.currentGroupId);
            })
            .catch(e => {
                //TODO: Handle catch
            });
    }

    showAddContentModal(show) {
        this.setState({showAddContentModal: show});
    }

    render() {
        return (
            <div>
                <div className="row">
                    <h3>{this.props.currentGroupName}</h3>
                    <OverlayTrigger
                        trigger="click"
                        placement="right"
                        show={this.state.showGroupSettings}
                        rootClose
                        overlay={
                            <Popover id="popover-basic">
                                <SettingsPopover
                                    groupId={this.props.currentGroupId}
                                    showInviteUserModal={this.props.showInviteUserModal}
                                    showLeaveGroupModal={this.props.showLeaveGroupModal}
                                    showMembersListModal={this.props.showMembersListModal}
                                />
                            </Popover>
                        }>
                        <Button variant="outline-primary"><i className="fa fa-cog"/></Button>
                    </OverlayTrigger>
                </div>

                <div className="row">
                    {this.props.contents.map((content) => {
                        return (
                            <div
                                className="card content-card ml-2 mr-2 mt-1"
                                key={content.id}
                                onClick={() => this.showContentModal(true, content.content_picture.url)}
                            >

                                <img
                                    className="card-img-top"
                                    src={content.content_picture.url}
                                    height="170"
                                />
                                <div className="card-body align-items-center d-flex justify-content-center">
                                    <span>12 <i className="fa fa-comment-o"/></span>
                                </div>
                            </div>
                        );
                    })}
                    {this.props.currentGroupId !== '0' &&
                    <div className="ml-2 mr-2 mt-1">
                        <button
                            type="button"
                            className="btn btn-outline-secondary add-content-button"
                            // onClick={() => this.upload.click()}
                            onClick={() => this.showAddContentModal(true)}
                        >
                            <i className="fa fa-plus"/>
                        </button>
                        {this.state.showAddContentModal &&
                        <AddContentModal
                            onClose={() => this.showAddContentModal(false)}
                            loadContents={this.props.loadContents}
                            currentGroupId={this.props.currentGroupId}
                        />
                        }

                        {this.state.showContentModal &&
                        <ContentModal
                            onClose={() => this.showContentModal(false)}
                            imgUrl={this.state.selectedUrl}
                        />
                        }
                    </div>
                    }
                </div>
            </div>
        );
    }
}

export default Contents;

Contents.propTypes = {
    contents: PropTypes.any,
    loadContents: PropTypes.func.isRequired,
    currentGroupId: PropTypes.any,
    currentGroupName: PropTypes.any,
    showInviteUserModal: PropTypes.func.isRequired,
    showMembersListModal: PropTypes.func.isRequired,
    showLeaveGroupModal: PropTypes.func.isRequired
}
