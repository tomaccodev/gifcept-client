let token: string | undefined;

export const setToken = (newToken?: string) => {
  token = newToken;
};

const getDefaultInit: () => RequestInit = () => {
  const authorizationHeader: any = {};
  if (token) {
    authorizationHeader.authorization = `Bearer ${token}`;
  }

  return {
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      ...authorizationHeader,
      'content-type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
  };
};

export const getInitForGet: () => RequestInit = () => ({
  ...getDefaultInit(),
  method: 'GET',
});

export const getInitForPost: () => RequestInit = () => ({
  ...getDefaultInit(),
  method: 'POST',
});

export const getInitForPatch: () => RequestInit = () => ({
  ...getDefaultInit(),
  method: 'PATCH',
});

export const getInitForDelete: () => RequestInit = () => ({
  ...getDefaultInit(),
  method: 'DELETE',
});
