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

interface IPaginationOptions {
  before?: string;
}

export const getGifs: (paginationOptions?: IPaginationOptions) => Promise<IGif[]> = ({
  before,
}: IPaginationOptions = {}) =>
  get<IServerGif[]>(`/api/gifs${before ? `?before=${before}` : ''}`).then(gifs =>
    gifs.map(g => ({
      ...g,
      animationUrlPath: `/${g.id}.gif`,
      created: new Date(g.created),
      frameUrlPath: `/${g.id}.png`,
    })),
  );

export const getGifComments: (
  gifId: string,
  aginationOptions?: IPaginationOptions,
) => Promise<IComment[]> = (gifId, { before }: IPaginationOptions = {}) =>
  get<IComment[]>(`/api/gifs/${gifId}/comments`);

export const addLikeToGif: (gifId: string) => Promise<void> = gifId =>
  responselessPost(`/api/gifs/${gifId}/likes`);
