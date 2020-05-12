import { format } from 'url';

import { Rating } from '../common/constants';

import { getRequest, patchRequest, postRequest, responselessDeleteRequest } from './common/methods';
import { IApiModel, IApiModelWithCreation } from './common/model';

interface IUser extends IApiModel {
  username: string;
}

interface IServerLike extends IApiModel, IApiModelWithCreation {
  user: IUser;
}

export interface ILike extends Omit<IServerLike, 'created'> {
  created: Date;
}

export interface IServerComment extends IApiModel, IApiModelWithCreation {
  text: string;
  user: IUser;
}

export interface IComment extends Omit<IServerComment, 'created'> {
  created: Date;
}

interface IServerGif extends IApiModel, IApiModelWithCreation {
  shortId: string;
  color: string;
  description: string;
  rating: Rating;
  viewsCount: number;
  likes: IServerLike[];
  likesCount: number;
  comments: IServerComment[];
  commentsCount: number;
  sharesCount: number;
  user: IUser;
  tags: string[];
}

export interface IGif extends Omit<Omit<Omit<IServerGif, 'created'>, 'likes'>, 'comments'> {
  animationUrlPath: string;
  frameUrlPath: string;
  created: Date;
  likes: ILike[];
  comments: IComment[];
}

export interface IGetGifsOptions {
  before?: string;
  matching?: string;
  rating?: Rating;
}

export interface IGetUserGifsOptions extends IGetGifsOptions {
  username: string;
}

export interface IGifPatch {
  description: string;
  rating: Rating;
  tags: string[];
}

const normalizeApiModelWithCreation = <T extends IApiModelWithCreation>(model: T) => ({
  ...model,
  created: new Date(model.created),
});

const normalizeGif = (gif: IServerGif) => ({
  ...normalizeApiModelWithCreation(gif),
  animationUrlPath: `/${gif.shortId}.gif`,
  frameUrlPath: `/${gif.shortId}.jpg`,
  likes: gif.likes.map(normalizeApiModelWithCreation),
  comments: gif.comments.map(normalizeApiModelWithCreation),
});

export const getGifs = (options: IGetGifsOptions = {}) => {
  const query: IGetGifsOptions = {};
  if (options.before) {
    query.before = options.before;
  }
  if (options.matching) {
    query.matching = options.matching;
  }
  if (options.rating) {
    query.rating = options.rating;
  }
  return getRequest<IServerGif[]>(
    format({
      pathname: '/api/gifs',
      query: {
        ...query,
      },
    }),
  ).then((gifs) => gifs.map(normalizeGif));
};

export const getUserGifs = (options: IGetUserGifsOptions) => {
  const query: IGetGifsOptions = {};
  if (options.before) {
    query.before = options.before;
  }
  if (options.matching) {
    query.matching = options.matching;
  }
  if (options.rating) {
    query.rating = options.rating;
  }
  return getRequest<IServerGif[]>(
    format({
      pathname: `/api/users/${options.username}/gifs`,
      query: {
        ...query,
      },
    }),
  ).then((gifs) => gifs.map(normalizeGif));
};

export const addGifByFile = (file: File) => {
  const formData = new FormData();
  formData.append('gif', file);
  return postRequest<IServerGif>('/api/gifs', formData).then(normalizeGif);
};

export const addGifByUrl = (url: string) =>
  postRequest<IServerGif>('/api/gifs', {
    url,
  }).then(normalizeGif);

export const updateGif = (gif: IGif, updatedInfo: IGifPatch) =>
  patchRequest<IServerGif>(`/api/gifs/${gif.id}`, updatedInfo).then(normalizeGif);

export const deleteGif = (gif: IGif) => responselessDeleteRequest(`/api/gifs/${gif.id}`);

export const addLike = (gif: IGif) =>
  postRequest<IServerLike>(`/api/gifs/${gif.id}/likes`).then(normalizeApiModelWithCreation);

export const removeLike = (gif: IGif) => responselessDeleteRequest(`/api/gifs/${gif.id}/likes`);
