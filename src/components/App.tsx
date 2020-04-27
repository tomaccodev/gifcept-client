import { debounce } from 'lodash';
import { observer, useLocalStore } from 'mobx-react';
import React, { useCallback } from 'react';

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

  const debouncedSetCurrentSearch = useCallback(
    debounce(gifs.setCurrentSearch, SEARCH_DEBOUNCE_DELAY),
    [gifs],
  );

  return (
    <div className="App">
      <Header
        loggedUser={auth.user}
        onShowLoginModal={() => setLoginModalVisible(true)}
        onShowAddGifModal={() => setAddGifModalVisible(true)}
        onSearchChange={debouncedSetCurrentSearch}
        currentRating={gifs.currentRating}
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
      />
    </div>
  );
});
