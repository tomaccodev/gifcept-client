import { format } from 'url';

import { Rating } from '../common/constants';

import { get } from './common/methods';
import { IApiModel } from './common/model';

interface IUser extends IApiModel {
  username: string;
}

interface IServerGif extends IApiModel {
  shortId: string;
  color: string;
  description: string;
  rating: Rating;
  created: string;
  viewsCount: number;
  likesCount: number;
  comments: IComment[];
  commentsCount: number;
  sharesCount: number;
  userName: string;
  userId: string;
  tags: string[];
}

export interface IGif extends Omit<IServerGif, 'created'> {
  animationUrlPath: string;
  frameUrlPath: string;
  created: Date;
}

export interface IComment extends IApiModel {
  text: string;
  user: IUser;
  created: string;
}

export interface IGetGifsOptions {
  before?: string;
  matching?: string;
  rating?: Rating;
}

const normalizeGif = (gif: IServerGif) => ({
  ...gif,
  animationUrlPath: `/${gif.shortId}.gif`,
  created: new Date(gif.created),
  frameUrlPath: `/${gif.shortId}.jpg`,
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
  return get<IServerGif[]>(
    format({
      pathname: '/api/gifs',
      query: {
        ...query,
      },
    }),
  ).then((gifs) => gifs.map(normalizeGif));
};
