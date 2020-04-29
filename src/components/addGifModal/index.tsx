import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import ReactModal from 'react-modal';

import './AddGifModal.css';

interface IAddGifModalProps {
  open: boolean;
  onClose: () => void;
  onAddGifByUrl: (url: string) => void;
  onAddGifByFile: (file: File) => void;
}

export default ({ open, onClose, onAddGifByUrl, onAddGifByFile }: IAddGifModalProps) => {
  const urlInput = useRef<HTMLInputElement>(null);
  const addGifByUrl = useCallback(async () => {
    await onAddGifByUrl(urlInput.current!.value);
    onClose();
  }, [urlInput, onAddGifByUrl, onClose]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const onFileSelected = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      setSelectedFiles(ev.target.files ? Array.from(ev.target.files) : []);
    },
    [setSelectedFiles],
  );

  const addGifsByFiles = useCallback(async () => {
    await Promise.all(selectedFiles.map(onAddGifByFile));
    onClose();
  }, [onClose, selectedFiles, onAddGifByFile]);

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
        <div>
          <h3>Choose gif files from your computer</h3>
          <input onChange={onFileSelected} type="file" accept=".gif" multiple />
          <button disabled={selectedFiles.length === 0} onClick={addGifsByFiles}>
            Submit
          </button>
        </div>
      </div>
    </ReactModal>
  );
};
