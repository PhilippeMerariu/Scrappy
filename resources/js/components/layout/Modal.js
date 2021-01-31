import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="modal-md">
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="modal" aria-modal="true">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="modal">{this.props.title}</h4>
                                {this.props.onClose &&
                                    <button type="button" className="close" aria-hidden="true" onClick={this.props.onClose}>×</button>
                                }
                            </div>
                            <div className="modal-body">
                                {this.props.children}
                            </div>

                            {this.props.footer &&
                                <div className="modal-footer">
                                    <button type="button" onClick={this.props.onClose} className="btn btn-danger" data-dismiss="modal">Close</button>
                                    <button type="button" onClick={this.props.onSend} className="btn btn-primary">Submit</button>
                                </div>
                            }

                        </div>
                    </div>
                </div>
                <div className="modal-backdrop fade show" />
            </div>
        );
    }
}

export default Modal;

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onSend: PropTypes.func,
    footer: PropTypes.any
}