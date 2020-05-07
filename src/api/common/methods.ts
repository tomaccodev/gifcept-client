import Emitter, { Event } from '../../events';

import { getInitForDelete, getInitForGet, getInitForPatch, getInitForPost } from './init';

interface IDictionary {
  [key: string]: any;
}

const expectValidStatus = (res: Response) => {
  if (res.status === 401) {
    Emitter.emit(Event.logout);
  }
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
    .then((res) => jsonHandler<T>(res)) as Promise<T>;

export const getRequest = <T>(url: string, init: RequestInit = getInitForGet()) =>
  jsonFetch<T>(url, init) as Promise<T>;

export const postRequest = <T>(
  url: string,
  data?: IDictionary | FormData,
  init: RequestInit = getInitForPost(),
) => {
  if (data instanceof FormData && init.headers) {
    const headers = init.headers as any;
    delete headers['content-type'];
  }
  return jsonFetch<T>(url, {
    ...init,
    body: data instanceof FormData ? data : JSON.stringify(data),
  }) as Promise<T>;
};

export const responselessPostRequest = (
  url: string,
  data?: IDictionary,
  init: RequestInit = getInitForPost(),
) =>
  responselessFetch(url, {
    ...init,
    body: JSON.stringify(data),
  });

export const patchRequest = <T>(
  url: string,
  data?: IDictionary | FormData,
  init: RequestInit = getInitForPatch(),
) => {
  if (data instanceof FormData && init.headers) {
    const headers = init.headers as any;
    delete headers['content-type'];
  }
  return jsonFetch<T>(url, {
    ...init,
    body: data instanceof FormData ? data : JSON.stringify(data),
  }) as Promise<T>;
};

export const deleteRequest = <T>(url: string, init: RequestInit = getInitForDelete()) =>
  jsonFetch<T>(url, init);

export const responselessDeleteRequest = <T>(url: string, init: RequestInit = getInitForDelete()) =>
  responselessFetch(url, init);
