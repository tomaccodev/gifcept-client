import { getInitForGet, getInitForPost } from './init';

interface IDictionary {
  [key: string]: any;
}

const expectValidStatus: (res: Response) => Response = res => {
  if (res.status >= 400) {
    throw new Error(`Response with bad status ${res.status}`);
  }

  return res;
};

const responselessFetch: (url: string, init: RequestInit) => Promise<void> = (url, init) =>
  fetch(url, init)
    .then(expectValidStatus)
    .then(() => {
      return;
    });

const jsonHandler: (res: Response) => Promise<IDictionary> = res => res.json();

const jsonFetch: (url: string, init: RequestInit) => Promise<IDictionary> = (url, init) =>
  fetch(url, init)
    .then(expectValidStatus)
    .then(jsonHandler);

export const get: (url: string) => Promise<any> = url => jsonFetch(url, getInitForGet());

export const post: (url: string, data?: IDictionary) => Promise<any> = (url, data) =>
  jsonFetch(url, {
    ...getInitForPost(),
    body: JSON.stringify(data),
  });

export const responselessPost: (url: string, data?: IDictionary) => Promise<void> = (url, data) =>
  responselessFetch(url, {
    ...getInitForPost(),
    body: JSON.stringify(data),
  });
