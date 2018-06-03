import { Rating } from '../common/constants';
import { get } from './common/methods';

interface IApiModel {
  id: string;
}

interface IUser extends IApiModel {
  username: string;
}

interface IServerGif extends IApiModel {
  id: string;
  color: string;
  description: string;
  rating: Rating;
  created: string;
  viewsCount: number;
  likesCount: number;
  comments: IComment[];
  commentsCount: number;
  sharesCount: number;
  user: IUser;
}

export interface IGif extends IServerGif {
  animationUrlPath: string;
  frameUrlPath: string;
}

export interface IComment extends IApiModel {
  text: string;
  user: IUser;
  created: string;
}

export const getGifs: () => Promise<IGif[]> = () =>
  get('/api/gifs').then((gifs: IServerGif[]) =>
    gifs.map(g => ({
      ...g,
      animationUrlPath: `/${g.id}.gif`,
      frameUrlPath: `/${g.id}.png`,
    })),
  );

export const getGifComments: (gifId: string) => Promise<IComment[]> = gifId =>
  get(`/api/gifs/${gifId}/comments`);
