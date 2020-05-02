import { debounce } from 'lodash';
import { observer, useLocalStore } from 'mobx-react';
import React, { DragEvent, useCallback, useState } from 'react';

import { IGif } from '../api/gifs';
import { Event } from '../events';
import useEventEmitter from '../hooks/useEventEmitter';
import useStores from '../hooks/useStores';
import { GIF_MIME } from '../utils/constants';

import AddGifModal from './addGifModal';
import styles from './App.module.scss';
import Content from './content';
import EditGifModal from './editGifModal';
import GifModal from './gifModal';
import Header from './header';
import LoginModal from './loginModal';

interface IAppStore {
  loginModalVisible: boolean;
  selectedGif?: IGif;
  addGifModalVisible: boolean;
  setLoginModalVisible: (visible: boolean) => void;
  setSelectedGif: (gif: IGif) => void;
  clearSelectedGif: () => void;
  setAddGifModalVisible: (visible: boolean) => void;
}

const appStore: () => IAppStore = () => ({
  loginModalVisible: false,
  selectedGif: undefined,
  addGifModalVisible: false,
  setLoginModalVisible(visible: boolean) {
    this.loginModalVisible = visible;
  },
  setSelectedGif(gif: IGif) {
    this.selectedGif = gif;
  },
  clearSelectedGif() {
    this.selectedGif = undefined;
  },
  setAddGifModalVisible(visible: boolean) {
    this.addGifModalVisible = visible;
  },
});

const SEARCH_DEBOUNCE_DELAY = 300;

export default observer(() => {
  const { auth, gifs } = useStores();
  const {
    loginModalVisible,
    selectedGif,
    addGifModalVisible,
    setLoginModalVisible,
    setSelectedGif,
    clearSelectedGif,
    setAddGifModalVisible,
  } = useLocalStore(appStore);

  const [hovering, setHovering] = useState(false);
  const [unhilightTimeout, setUnhilightTimeout] = useState<NodeJS.Timeout | undefined>(undefined);
  const [editingGif, setEditingGif] = useState<IGif>();

  const highlightDropZone = useCallback(
    (ev: DragEvent<HTMLDivElement>) => {
      ev.preventDefault();
      ev.stopPropagation();
      if (unhilightTimeout) {
        clearTimeout(unhilightTimeout);
        setUnhilightTimeout(undefined);
      }
      if (!hovering) {
        setHovering(true);
      }
    },
    [setHovering, hovering, unhilightTimeout],
  );
  const unhighlightDropZone = useCallback(
    (ev: DragEvent<HTMLDivElement>) => {
      ev.preventDefault();
      ev.stopPropagation();
      if (hovering && !unhilightTimeout) {
        setUnhilightTimeout(
          setTimeout(() => {
            setHovering(false);
          }, 0),
        );
      }
    },
    [setHovering, hovering, unhilightTimeout],
  );
  const handleDrop = useCallback(
    async (ev: DragEvent<HTMLDivElement>) => {
      ev.preventDefault();
      ev.stopPropagation();
      if (unhilightTimeout) {
        clearTimeout(unhilightTimeout);
        setUnhilightTimeout(undefined);
      }
      const files = Array.from(ev.dataTransfer.files).filter((f) => f.type === GIF_MIME);
      const droppedUri = ev.dataTransfer.getData('text/uri-list');
      const promises = [...files.map(gifs.addGifByFile)];
      if (droppedUri) {
        promises.push(gifs.addGifByUrl(droppedUri));
      }
      await Promise.all(promises);
      setHovering(false);
    },
    [gifs, unhilightTimeout],
  );

  useEventEmitter<string>(Event.pasteURL, async (url) => {
    if (!addGifModalVisible && auth.user) {
      setHovering(true);
      await gifs.addGifByUrl(url);
      setHovering(false);
    }
  });

  useEventEmitter<File[]>(Event.pasteGifFiles, async (files) => {
    if (!addGifModalVisible && auth.user) {
      setHovering(true);
      await Promise.all(files.map(gifs.addGifByFile));
      setHovering(false);
    }
  });

  const debouncedSetCurrentSearch = useCallback(
    debounce(gifs.setCurrentSearch, SEARCH_DEBOUNCE_DELAY),
    [gifs],
  );

  const dropOverlay = hovering ? (
    <div className={styles['drop-overlay']}>
      <h2>Drop files here</h2>
    </div>
  ) : null;

  return (
    <div
      className="App"
      onDragEnterCapture={auth.user && highlightDropZone}
      onDragOverCapture={auth.user && highlightDropZone}
      onDragLeaveCapture={auth.user && unhighlightDropZone}
      onDrop={auth.user && handleDrop}
    >
      {dropOverlay}
      <Header
        loggedUser={auth.user}
        currentRating={gifs.currentRating}
        search={gifs.currentSearch}
        onShowLoginModal={() => setLoginModalVisible(true)}
        onShowAddGifModal={() => setAddGifModalVisible(true)}
        onSearchChange={debouncedSetCurrentSearch}
        onRatingChange={gifs.setCurrentRating}
      />
      <Content onSetSelectedGif={setSelectedGif} />
      <LoginModal
        isOpen={loginModalVisible}
        onClose={() => setLoginModalVisible(false)}
        onLogin={auth.login}
      />
      <GifModal
        loggedUser={auth.user}
        gif={selectedGif}
        onClose={clearSelectedGif}
        onEdit={setEditingGif}
      />
      <AddGifModal
        open={addGifModalVisible}
        onClose={() => setAddGifModalVisible(false)}
        onAddGifByUrl={gifs.addGifByUrl}
        onAddGifByFile={gifs.addGifByFile}
      />
      <EditGifModal
        gif={editingGif}
        onClose={() => setEditingGif(undefined)}
        onSave={gifs.updateGif}
      />
    </div>
  );
});
