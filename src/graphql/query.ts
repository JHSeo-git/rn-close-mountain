import axios from 'axios';
import Config from 'react-native-config';
import AppError from '../utils/error/AppError';
import signedQuery from './openseaQuery';

if (!Config.TESTNETS_URL) {
  throw new AppError({
    message: 'env.TESTNETS_URL is not defined',
    name: 'TESTNETS_URL_NOT_DEFINED',
    label: 'APP',
  });
}

const client = axios.create();
const GRAPHQL_URL = `${Config.TESTNETS_URL}/graphql/`;

client.defaults.url = GRAPHQL_URL;
client.defaults.withCredentials = true;
client.defaults.headers.common['Content-Type'] = 'application/json';

function query() {}

export default query;
