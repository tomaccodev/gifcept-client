import { observer } from 'mobx-react';
import React, { Component } from 'react';
import ReactModal from 'react-modal';

import './LoginModal.css';

interface ILoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

@observer
export default class extends Component<ILoginModalProps> {
  public render() {
    const { isOpen, onClose } = this.props;

    return (
      <ReactModal
        isOpen={isOpen}
        className="modal-wrapper"
        overlayClassName="modal-overlay-wrapper"
      >
        <div className="topbar">
          <div className="topbar-right">
            <button
              onClick={onClose}
              className="header-button gif-popup-button-close"
              title="Close"
            >
              <i className="material-icons"></i>
            </button>
          </div>
          <div className="clearfix" />
        </div>
        <div className="main-content"></div>
      </ReactModal>
    );
  }
}
