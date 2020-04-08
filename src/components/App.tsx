import { observer, useLocalStore } from 'mobx-react';
import React from 'react';

import { IGif } from '../api/gifs';
import useStores from '../hooks/useStores';

import Content from './content';
import GifModal from './gifModal';
import Header from './header';
import LoginModal from './loginModal';

interface IAppStore {
  loginModalVisible: boolean;
  selectedGif?: IGif;
  setLoginModalVisible: (visible: boolean) => void;
  setSelectedGif: (gif: IGif) => void;
  clearSelectedGif: () => void;
}

const appStore: () => IAppStore = () => ({
  loginModalVisible: false,
  selectedGif: undefined,
  setLoginModalVisible(visible: boolean) {
    this.loginModalVisible = visible;
  },
  setSelectedGif(gif: IGif) {
    this.selectedGif = gif;
  },
  clearSelectedGif() {
    this.selectedGif = undefined;
  },
});

export default observer(() => {
  const { auth } = useStores();
  const {
    loginModalVisible,
    selectedGif,
    setLoginModalVisible,
    setSelectedGif,
    clearSelectedGif,
  } = useLocalStore(appStore);

  return (
    <div className="App">
      <Header
        loggedUser={auth.user}
        onShowLoginModal={() => setLoginModalVisible(true)}
        onSearch={() => {
          /* TODO: Handle Search */
        }}
      />
      <Content onSetSelectedGif={setSelectedGif} />
      <LoginModal
        isOpen={loginModalVisible}
        onClose={() => {
          setLoginModalVisible(false);
        }}
        onLogin={auth.login}
      />
      <GifModal gif={selectedGif} onClose={clearSelectedGif} />
    </div>
  );
});
