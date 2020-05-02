import React, { useCallback, useState } from 'react';
import ReactModal from 'react-modal';

import { IGif, IGifPatch } from '../../api/gifs';

import styles from './EditGifModal.module.scss';

interface IEditGifModalProps {
  gif?: IGif;
  onSave: (gif: IGif, updatedInfo: IGifPatch) => void;
  onClose: () => void;
}

export default ({ gif, onClose, onSave }: IEditGifModalProps) => {
  const [description, setDescription] = useState<string>(gif?.description || '');
  const [tags, setTags] = useState<string>(gif?.tags.join(', ') || '');
  const [saving, setSaving] = useState<boolean>(false);

  const save = useCallback(async () => {
    if (gif) {
      try {
        setSaving(false);
        await onSave(gif, {
          description,
          tags: tags.split(',').map((t) => t.trim()),
        });
        onClose();
      } catch (e) {
        setSaving(false);
      }
    }
  }, [description, gif, onClose, onSave, tags]);

  return (
    <ReactModal
      isOpen={!!gif}
      className={styles['modal-wrapper']}
      overlayClassName={styles['modal-overlay-wrapper']}
    >
      <div className={styles.topbar}>
        <div className={styles['topbar-right']}>
          <button onClick={save} disabled={saving} className={styles['header-button']} title="Save">
            <i className="material-icons">save</i>
          </button>
          <button onClick={onClose} className={styles['header-button']} title="Close">
            <i className="material-icons">close</i>
          </button>
        </div>
      </div>
      <div className={styles['main-title']}>
        Description:{' '}
        <input type="text" value={description} onChange={(ev) => setDescription(ev.target.value)} />
      </div>
      <div className={styles['main-content']}>
        <div className={styles.main}>
          <button className={styles.gif}>
            <img src={gif && gif.animationUrlPath} alt={gif?.description} />
          </button>
        </div>
      </div>
      <div className={styles['info-wrapper']}>
        tags: <input type="text" value={tags} onChange={(ev) => setTags(ev.target.value)} />
      </div>
    </ReactModal>
  );
};
