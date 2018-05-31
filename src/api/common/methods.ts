import { getInit, postInit } from './init';

interface IDictionary {
  [key: string]: any;
}

const jsonHandler: (res: Response) => Promise<IDictionary> = res => res.json();

const jsonFetch = (url: string, init: RequestInit) => fetch(url, init).then(jsonHandler);

export const get: (url: string) => Promise<any> = url => jsonFetch(url, getInit);

export const post: (url: string, data: IDictionary) => Promise<any> = (url, data) =>
  jsonFetch(url, {
    ...postInit,
    body: JSON.stringify(data),
  });
