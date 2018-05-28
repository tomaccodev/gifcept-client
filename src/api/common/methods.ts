import { postInit } from './init';

interface IDictionary {
  [key: string]: any;
}

const jsonHandler: (res: Response) => Promise<IDictionary> = res => res.json();

const jsonFetch = (url: string, init: RequestInit) => fetch(url, init).then(jsonHandler);

export const post: (url: string, data: IDictionary) => Promise<IDictionary> = (url, data) =>
  jsonFetch(url, {
    ...postInit,
    body: JSON.stringify(data),
  });
