import axios from 'axios';
import Config from 'react-native-config';
import AppError from '../../utils/error/AppError';
import Manager from './Manager';

const DEBUG = false;

if (!Config.TESTNETS_URL) {
  throw new AppError({
    message: 'env.TESTNETS_URL is not defined',
    name: 'TESTNETS_URL_NOT_DEFINED',
    label: 'APP',
  });
}

const client = axios.create();

const baseURL = Config.TESTNETS_URL;
client.defaults.baseURL = baseURL;
client.defaults.withCredentials = true;
client.defaults.headers.common['Content-Type'] = 'application/json';

export function applyToken(token: string) {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
}
export function removeToken() {
  delete client.defaults.headers.common.Authorization;
}

export function getImageUrl(url: string) {
  if (url.startsWith('http')) {
    return `${url}`;
  }

  return url.startsWith('/') ? `${baseURL}${url}` : `${baseURL}/${url}`;
}

const manager = new Manager();

// request
client.interceptors.request.use(
  config => {
    const requested = {
      url: `${config.baseURL}${config.url}`,
      header: config.headers,
      method: config.method,
      params: config.params,
      data: config.data,
    };

    if (DEBUG) {
      console.log('request: ', JSON.stringify(requested, null, 2));
    } else {
      console.log('request: ', requested.url);
    }

    return manager.requestHandler(config);
  },
  error => {
    console.log('request error: ', JSON.stringify(error, null, 2));

    return manager.errorHandler(error);
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
      if (DEBUG) {
        console.log('response: ', JSON.stringify(responsed, null, 2));
      }
    } else if (response.status === 204) {
      const responsed = {
        url: response.config.url,
      };
      if (DEBUG) {
        console.log('response: ', JSON.stringify(responsed, null, 2));
      }
    } else {
      const error = {
        url: response.config.url,
        ...response.data,
      };
      if (DEBUG) {
        console.error('response false error: ', JSON.stringify(error, null, 2));
      }
    }

    return manager.responseHandler(response);
  },
  error => {
    // https://stackoverflow.com/questions/44806333/unable-to-catch-and-log-the-error-response-from-an-axios-request
    const errorMessage = error.response?.data ?? error;
    console.error('response true error: ', JSON.stringify(errorMessage, null, 2));

    return manager.errorHandler(error);
  },
);

export default client;
