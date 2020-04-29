import { debounce } from 'lodash';
import { observer, useLocalStore } from 'mobx-react';
import React, { DragEvent, useCallback, useState } from 'react';

import { IGif } from '../api/gifs';
import useStores from '../hooks/useStores';

import AddGifModal from './addGifModal';
import Content from './content';
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

const mime = 'image/gif';

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
      const files = Array.from(ev.dataTransfer.files).filter((f) => f.type === mime);
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

  const debouncedSetCurrentSearch = useCallback(
    debounce(gifs.setCurrentSearch, SEARCH_DEBOUNCE_DELAY),
    [gifs],
  );

  const dropOverlay = hovering ? (
    <div className="drop-overlay">
      <h2>Drop files here</h2>
    </div>
  ) : null;

  return (
    <div
      className="App"
      onDragEnterCapture={highlightDropZone}
      onDragOverCapture={highlightDropZone}
      onDragLeaveCapture={unhighlightDropZone}
      onDrop={handleDrop}
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
      <GifModal gif={selectedGif} onClose={clearSelectedGif} />
      <AddGifModal
        open={addGifModalVisible}
        onClose={() => setAddGifModalVisible(false)}
        onAddGifByUrl={gifs.addGifByUrl}
        onAddGifByFile={gifs.addGifByFile}
      />
    </div>
  );
});
