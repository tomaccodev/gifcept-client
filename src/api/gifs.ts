import { Rating } from '../common/constants';
import { get } from './common/methods';

export interface IGif {
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

export const getGifs: () => Promise<IGif[]> = () => get('/api/gifs') as Promise<IGif[]>;
