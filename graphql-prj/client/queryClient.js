import axios from 'axios';
import { request } from 'graphql-request';

const URL = 'http://localhost:8000/graphql';

const fetcher = (query, variables = {}) => request(URL, query, variables);

const QueryKeys = {
  MESSAGES: 'MESSAGES',
  MESSAGE: 'MESSAGE',
  USERS: 'USERS',
  USER: 'USER'
}

export { fetcher, QueryKeys };