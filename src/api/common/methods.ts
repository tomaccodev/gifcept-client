import { getInitForGet, getInitForPost } from './init';

interface IDictionary {
  [key: string]: any;
}

const expectValidStatus = (res: Response) => {
  if (res.status >= 400) {
    throw new Error(`Response with bad status ${res.status}`);
  }

  return res;
};

const responselessFetch = (url: string, init: RequestInit) =>
  fetch(url, init)
    .then(expectValidStatus)
    .then(() => {
      return;
    });

const jsonHandler = <T>(res: Response) => res.json() as Promise<T>;

const jsonFetch = <T>(url: string, init: RequestInit) =>
  fetch(url, init)
    .then(expectValidStatus)
    .then(res => jsonHandler<T>(res)) as Promise<T>;

export const get = <T>(url: string, init: RequestInit = getInitForGet()) =>
  jsonFetch<T>(url, init) as Promise<T>;

export const post = <T>(url: string, data?: IDictionary, init: RequestInit = getInitForPost()) =>
  jsonFetch<T>(url, {
    ...init,
    body: JSON.stringify(data),
  }) as Promise<T>;

export const responselessPost = (
  url: string,
  data?: IDictionary,
  init: RequestInit = getInitForPost(),
) =>
  responselessFetch(url, {
    ...init,
    body: JSON.stringify(data),
  });
