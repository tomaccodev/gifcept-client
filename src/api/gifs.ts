import { Rating } from '../common/constants';
import { get } from './common/methods';

export interface IGif {
  _id: string;
  description: string;
  rating: Rating;
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
  receptsCount: number;
}

export const getGifs: () => Promise<IGif[]> = () => get('/api/gifs') as Promise<IGif[]>;
