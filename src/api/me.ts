import { getRequest } from './common/methods';

export const getTags = () => getRequest<string[]>('/api/me/tags');
