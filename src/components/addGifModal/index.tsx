import React, { useCallback, useRef } from 'react';
import ReactModal from 'react-modal';

import './AddGifModal.css';

interface IAddGifModalProps {
  open: boolean;
  onClose: () => void;
  onAddGifByUrl: (url: string) => void;
}

export default ({ open, onClose, onAddGifByUrl }: IAddGifModalProps) => {
  const urlInput = useRef<HTMLInputElement>(null);
  const addGifByUrl = useCallback(() => onAddGifByUrl(urlInput.current!.value), [
    urlInput,
    onAddGifByUrl,
  ]);

  return (
    <ReactModal isOpen={open} className="modal-wrapper" overlayClassName="modal-overlay-wrapper">
      <div className="topbar">
        <div className="topbar-left"></div>
        <div className="topbar-right">
          <button onClick={onClose} className="header-button gif-popup-button-close" title="Close">
            <i className="material-icons"></i>
          </button>
        </div>
        <div className="clearfix" />
      </div>
      <div className="main-content">
        <div className="tab">
          <h3>Add a new gif from a url</h3>
          Gif Url: <input ref={urlInput} type="url" />
          <button onClick={addGifByUrl}>Submit</button>
        </div>
        <div className="tab">
          <h3>Add a new gif from a file</h3>
          <input type="file" />
          <button>Submit</button>
        </div>
      </div>
    </ReactModal>
  );
};
