import { format } from 'url';

import { Rating } from '../common/constants';
import { get, responselessPost } from './common/methods';

type KeyofBase = keyof any;
type Diff<T extends KeyofBase, U extends KeyofBase> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T];
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

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
  user?: string | null;
  search?: string;
  before?: string;
  sort?: string;
}

export const getGifs: (getGifsOptions?: IGetGifsOptions) => Promise<IGif[]> = (
  getGifsOptions = {},
) =>
  get<IServerGif[]>(
    format({
      pathname: '/api/gifs',
      query: Object.keys(getGifsOptions).reduce((accumulated, key) => {
        const current = { ...accumulated };
        if (
          getGifsOptions[key] !== undefined &&
          getGifsOptions[key] !== null &&
          getGifsOptions[key] !== ''
        ) {
          current[key] = getGifsOptions[key];
        }
        return current;
      }, {}),
    }),
  ).then(gifs =>
    gifs.map(g => ({
      ...g,
      animationUrlPath: `/${g.id}.gif`,
      created: new Date(g.created),
      frameUrlPath: `/${g.id}.jpg`,
    })),
  );

export const getGifComments: (
  gifId: string,
  aginationOptions?: IGetGifsOptions,
) => Promise<IComment[]> = (gifId, { before }: IGetGifsOptions = {}) =>
  get<IComment[]>(`/api/gifs/${gifId}/comments`);

export const addLikeToGif: (gifId: string) => Promise<void> = gifId =>
  responselessPost(`/api/gifs/${gifId}/likes`);
