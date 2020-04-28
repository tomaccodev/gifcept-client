import React, { DragEvent, useCallback, useRef, useState } from 'react';
import ReactModal from 'react-modal';

import './AddGifModal.css';

interface IAddGifModalProps {
  open: boolean;
  onClose: () => void;
  onAddGifByUrl: (url: string) => void;
  onAddGifByFile: (file: File) => void;
}

const mime = 'image/gif';

export default ({ open, onClose, onAddGifByUrl, onAddGifByFile }: IAddGifModalProps) => {
  const urlInput = useRef<HTMLInputElement>(null);
  const addGifByUrl = useCallback(() => onAddGifByUrl(urlInput.current!.value), [
    urlInput,
    onAddGifByUrl,
  ]);
  const [hovering, setHovering] = useState(false);
  const highlightDropZone = useCallback(
    (ev: DragEvent<HTMLDivElement>) => {
      ev.preventDefault();
      ev.stopPropagation();
      setHovering(true);
    },
    [setHovering],
  );
  const unhighlightDropZone = useCallback(
    (ev: DragEvent<HTMLDivElement>) => {
      ev.preventDefault();
      ev.stopPropagation();
      setHovering(false);
    },
    [setHovering],
  );
  const handleDrop = useCallback(
    (ev: DragEvent<HTMLDivElement>) => {
      const files = Array.from(ev.dataTransfer.files).filter((f) => f.type === mime);
      setHovering(false);
      Promise.all(files.map(onAddGifByFile));
      ev.preventDefault();
      ev.stopPropagation();
    },
    [unhighlightDropZone, onAddGifByFile],
  );

  const dropZoneClases = ['tab', 'dropzone'];

  if (hovering) {
    dropZoneClases.push('dragging');
  }

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
        <div
          className={dropZoneClases.join(' ')}
          onDragEnter={highlightDropZone}
          onDragOver={highlightDropZone}
          onDragLeave={unhighlightDropZone}
          onDrop={handleDrop}
        >
          <h3>Drop the file here</h3>
        </div>
      </div>
    </ReactModal>
  );
};
