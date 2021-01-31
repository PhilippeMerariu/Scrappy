import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from './layout/Modal';

class ContentModal extends Component {

    render(){
        return(
            <Modal
                title=""
                onClose={this.props.onClose}
                footer={false}

            >
                <img
                    className="real-size-image"
                    src={this.props.imgUrl}
                />
            </Modal>
        );
    }
}

export default ContentModal;

ContentModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    imgUrl: PropTypes.string.isRequired
}
