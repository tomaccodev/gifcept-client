import { get } from './common/methods';

export const getTags = () => get<string[]>('/api/me/tags');
