export const GIF_MIME = 'image/gif';

// eslint-disable-next-line
export const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}

export enum Rating {
  sfw = 'sfw',
  nsfw = 'nsfw',
  explicit = 'explicit',
  bizarre = 'bizarre',
  violent = 'violent',
}

export enum GifOrder {
  creation = 'created',
  popularity = 'popularity',
}
