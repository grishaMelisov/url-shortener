export enum ContentTypes {
  JSON = 'application/json',
  FORM = 'application/x-www-form-urlencoded',
  MULTIPART = 'multipart/form-data',
}

export const getContentType = (type: ContentTypes) => ({
  'Content-type': type,
});

export const errorCatch = (error: any): string => {
  if (!error) return 'Unrecognized error';
  if (typeof error === 'string') return error;

  const message = error?.response?.data?.message;

  return message
    ? typeof error.response.data.message === 'object'
      ? message[0]
      : message
    : error.message;
};
