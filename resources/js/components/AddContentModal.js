import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from './layout/Modal';
import { postContent } from '../utilities/api';

class AddContentModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            captionValue: '',
            file: null
        }
        this.onSend = this.onSend.bind(this);
        this.setCaptionValue = this.setCaptionValue.bind(this);
    }

    onSend() {
        postContent(this.props.currentGroupId, this.state.file, this.state.captionValue)
            .then(({ data }) => {
                this.props.onClose();
                this.props.loadContents(this.props.currentGroupId);
            })
            .catch(e => {
                //TODO: Handle catch
            });
    }

    setCaptionValue(e) {
        this.setState({ captionValue: e.target.value });
    }

    setFile(e) {
        this.setState({ file: e.target.files[0] })
    }

    render() {
        return (
            <Modal
                title="Add new content!"
                onClose={this.props.onClose}
                onSend={this.onSend}
                footer={true}
            >
                <Fragment>
                    <form>
                        <div className="form-group">
                            <label>Content picture</label>
                            <input
                                type="file"
                                className="form-control-file"
                                onChange={(e) => { this.setFile(e) }}
                            />
                        </div>
                        <div className="form-group">
                            <label>Caption</label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.captionValue}
                                onChange={(e) => { this.setCaptionValue(e) }}
                            />
                        </div>
                    </form>
                </Fragment>
            </Modal>
        );
    }
}

export default AddContentModal;

AddContentModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    loadContents: PropTypes.func.isRequired,
    currentGroupId: PropTypes.any
}