import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideModal } from '../../store/actions/modalActions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalHolder = ({
  showModal,
  message,
  confirmButton,
  hideModal,
  confirmFunc,
}) => (
  <Modal isOpen={showModal}>
    <ModalHeader>Modal title</ModalHeader>
    <ModalBody>{message}</ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={() => confirmFunc()}>
        {confirmButton}
      </Button>{' '}
      <Button color="secondary" onClick={() => hideModal()}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
);

function mapStateToProps({ modalReducer }) {
  return {
    ...modalReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ hideModal }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalHolder);
