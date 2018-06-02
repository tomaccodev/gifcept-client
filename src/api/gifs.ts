import { Rating } from '../common/constants';
import { get } from './common/methods';

interface IServerGif {
  id: string;
  color: string;
  description: string;
  rating: Rating;
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  user: {
    id: string;
    username: string;
  };
}

export interface IGif extends IServerGif {
  animationUrlPath: string;
  frameUrlPath: string;
}

export const getGifs: () => Promise<IGif[]> = () =>
  get('/api/gifs').then((gifs: IServerGif[]) =>
    gifs.map(g => ({
      ...g,
      animationUrlPath: `/${g.id}.gif`,
      frameUrlPath: `/${g.id}.png`,
    })),
  ) as Promise<IGif[]>;
