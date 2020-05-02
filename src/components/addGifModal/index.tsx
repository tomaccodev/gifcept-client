import React, { ChangeEvent, useCallback, useState } from 'react';
import ReactModal from 'react-modal';

import styles from './AddGifModal.module.scss';

interface IAddGifModalProps {
  open: boolean;
  onClose: () => void;
  onAddGifByUrl: (url: string) => void;
  onAddGifByFile: (file: File) => void;
}

export default ({ open, onClose, onAddGifByUrl, onAddGifByFile }: IAddGifModalProps) => {
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<boolean>(false);
  const [uploadingUrl, setUploadingUrl] = useState<boolean>(false);

  const onFileSelected = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      setSelectedFiles(ev.target.files ? Array.from(ev.target.files) : []);
    },
    [setSelectedFiles],
  );

  const addGifByUrl = useCallback(async () => {
    setCurrentUrl('');
    setUploadingUrl(true);
    await onAddGifByUrl(currentUrl);
    setUploadingUrl(false);
    onClose();
  }, [currentUrl, onAddGifByUrl, onClose]);

  const addGifsByFiles = useCallback(async () => {
    setUploadingFiles(true);
    await Promise.all(selectedFiles.map(onAddGifByFile));
    setUploadingFiles(true);
    onClose();
  }, [onClose, selectedFiles, onAddGifByFile]);

  return (
    <ReactModal
      isOpen={open}
      className={styles['modal-wrapper']}
      overlayClassName={styles['modal-overlay-wrapper']}
    >
      <div className={styles.topbar}>
        <div className={styles['topbar-right']}>
          <button onClick={onClose} className={styles['header-button']} title="Close">
            <i className="material-icons">close</i>
          </button>
        </div>
      </div>
      <div className={styles['main-content']}>
        <div className={styles.tab}>
          <h3>Add a new gif from a url</h3>
          Gif Url:{' '}
          <input value={currentUrl} onChange={(ev) => setCurrentUrl(ev.target.value)} type="url" />
          <button disabled={uploadingUrl} onClick={addGifByUrl}>
            Submit
          </button>
        </div>
        <div>
          <h3>Choose gif files from your computer</h3>
          <input onChange={onFileSelected} type="file" accept=".gif" multiple />
          <button disabled={selectedFiles.length === 0 || uploadingFiles} onClick={addGifsByFiles}>
            Submit
          </button>
        </div>
      </div>
    </ReactModal>
  );
};
