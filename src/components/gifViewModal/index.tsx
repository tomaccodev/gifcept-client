import { observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import * as moment from 'moment';
import * as React from 'react';
import * as ReactModal from 'react-modal';
import { Link } from 'react-router-dom';

import { format, parse } from 'url';
import { IGif } from '../../api/gifs';
import imagePreloader from '../../common/imagePreloader';
import { ILoggedUser } from '../../store/auth';

import Comment from './Comment';
import './GifViewModal.css';

interface IGifViewModalProps {
  isOpen: boolean;
  loggedUser: ILoggedUser | null;
  gif?: IGif;
  onClose: () => void;
  onLike: () => void;
}

@observer
export default class extends React.Component<IGifViewModalProps> {
  @observable private imageUrl: string;

  public async componentWillReceiveProps(newProps: IGifViewModalProps) {
    if (newProps.gif && newProps.gif !== this.props.gif) {
      runInAction(() => {
        this.imageUrl = newProps.gif!.frameUrlPath;
      });
      await imagePreloader(newProps.gif!.animationUrlPath);
      runInAction(() => {
        this.imageUrl = newProps.gif!.animationUrlPath;
      });
    }
  }

  public render() {
    const { gif, loggedUser, isOpen, onClose, onLike } = this.props;

    const editButton =
      gif && loggedUser && gif.user.id === loggedUser.id ? (
        <a href="#" className="header-button" title="Edit">
          <i className="material-icons"></i>
        </a>
      ) : null;

    return (
      <ReactModal
        isOpen={isOpen}
        className="gif-popup-wrapper"
        overlayClassName="popup-overlay-wrapper"
      >
        <div className="gif-popup-topbar">
          <div className="gif-popup-topbar-left">
            <a
              href="#"
              className="action-button gif-popup-like-button"
              title="Like"
              onClick={onLike}
            >
              <i className="material-icons"></i>
              <span className="action-button-text">Like</span>
              <span className="action-button-counter">({gif && gif.likesCount})</span>
            </a>
            <a href="#" className="action-button gif-popup-like-recept" title="Recept">
              <i className="material-icons"></i>
              <span className="action-button-text">Recept</span>
              <span className="action-button-counter">({gif && gif.sharesCount})</span>
            </a>
          </div>
          <div className="gif-popup-topbar-right">
            {editButton}
            <a onClick={onClose} className="header-button gif-popup-button-close" title="Close">
              <i className="material-icons"></i>
            </a>
          </div>
          <div className="clearfix" />
        </div>
        <div className="gif-popup-main-title">{gif && gif.description}</div>
        <div className="gif-popup-main-content">
          <div className="gif-popup-main">
            <a href="#" className="gif-popup-gif">
              <img src={this.imageUrl} alt="gif name, gif tags" />
            </a>
            <div className="gif-popup-main-share-wrapper" onClick={this.copyToClipboard}>
              Share
            </div>
          </div>
          <div className="gif-popup-comment-wrapper">
            {gif &&
              gif.comments.map(c => <Comment comment={c} key={c.id} loggedUser={loggedUser} />)}
          </div>
        </div>
        <div className="gif-popup-info-wrapper">
          tags: {gif && gif.tags.join(', ')}
          <br />
          uploaded by{' '}
          <Link onClick={onClose} to={gif ? `/${gif.user.id}/gifs` : ''}>
            {gif && gif.user.username}
          </Link>{' '}
          <span className="gif-single-comment-tools-time">
            {gif && moment(gif.created).fromNow()}
          </span>
        </div>
      </ReactModal>
    );
  }

  private copyToClipboard = async () => {
    const navigator = window.navigator as any;
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      const currentUrl = parse(window.location.href);
      currentUrl.pathname = `/${this.props.gif && this.props.gif.id}`;
      await navigator.clipboard.writeText(format(currentUrl));
    }
  };
}
