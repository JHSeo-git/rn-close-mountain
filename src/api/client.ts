import axios from 'axios';
import Config from 'react-native-config';

const client = axios.create();

// TODO: Add configurable base URL
const baseURL = Config.API_URL ?? 'http://localhost:1337';
client.defaults.baseURL = baseURL;
client.defaults.withCredentials = true;

export function applyToken(token: string) {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
}
export function removeToken() {
  delete client.defaults.headers.common.Authorization;
}

// request
client.interceptors.request.use(
  config => {
    const requested = {
      url: `${config.baseURL}${config.url}`,
      method: config.method,
      params: config.params,
      data: config.data,
    };
    console.log('request: ', JSON.stringify(requested, null, 2));
    return config;
  },
  error => {
    console.log('request error: ', JSON.stringify(error, null, 2));
    return Promise.reject(error);
  },
);

// response
client.interceptors.response.use(
  response => {
    if (response.data) {
      const responsed = {
        url: response.config.url,
        ...response.data,
      };
      console.log('response: ', JSON.stringify(responsed, null, 2));
    } else {
      const error = {
        url: response.config.url,
        ...response.data,
      };
      console.error('response true error: ', JSON.stringify(error, null, 2));
    }

    return response;
  },
  error => {
    // https://stackoverflow.com/questions/44806333/unable-to-catch-and-log-the-error-response-from-an-axios-request
    const errorMessage = error.response?.data ?? error;

    console.error(
      'response false error: ',
      JSON.stringify(errorMessage, null, 2),
    );

    return Promise.reject(error);
  },
);

export default client;
