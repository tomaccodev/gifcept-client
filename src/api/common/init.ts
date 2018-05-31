const defaultInit: RequestInit = {
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'content-type': 'application/json',
  },
  redirect: 'follow',
  referrer: 'no-referrer',
};

export const getInit: RequestInit = {
  ...defaultInit,
  method: 'GET',
};

export const postInit: RequestInit = {
  ...defaultInit,
  method: 'POST',
};
