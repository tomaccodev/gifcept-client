import { Rating } from '../common/constants';
import { get } from './common/methods';

export interface IGif {
  description: string;
  rating: Rating;
}

export const getGifs: () => Promise<IGif[]> = () => get('/api/gifs') as Promise<IGif[]>;
