import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from './layout/Modal';
import { postGroup } from '../utilities/api';

class AddGroupModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nameValue: '',
            file: null
        }
        this.onSend = this.onSend.bind(this);
        this.setNameValue = this.setNameValue.bind(this);
    }

    onSend() {
        postGroup(this.state.file, this.state.nameValue)
            .then(({ data }) => {
                this.props.onClose();
                this.props.loadGroups();
            })
            .catch(e => {
                //TODO: Handle catch
            });
    }

    setNameValue(e) {
        this.setState({ nameValue: e.target.value });
    }

    setFile(e) {
        this.setState({ file: e.target.files[0] })
    }

    render() {
        return (
            <Modal
                title="Add new group!"
                onClose={this.props.onClose}
                onSend={this.onSend}
                footer={true}
            >
                <Fragment>
                    <form>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.nameValue}
                                onChange={(e) => { this.setNameValue(e) }}
                            />
                        </div>
                        <div className="form-group">
                            <label>Group profile picture</label>
                            <input
                                type="file"
                                className="form-control-file"
                                onChange={(e) => { this.setFile(e) }}
                            />
                        </div>
                    </form>
                </Fragment>
            </Modal>
        );
    }
}

export default AddGroupModal;

AddGroupModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    loadGroups: PropTypes.func.isRequired
}