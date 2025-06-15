export const API_ROUTES = {
  SHORT_URL: {
    CREATE: '/shorten',
    DELETE: (alias: string) => `/delete/${alias}`,
    GET_INFO: (alias: string) => `/info/${alias}`,
  },
};
