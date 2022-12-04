import gql from 'graphql-tag';

const GET_USERS = gql`
  query GET_USERS {
    users {
      id
      nickname
    }
  }
`;

const GET_USER = gql`
  query GET_USER($id: ID!) {
    user(id: $id) {
      Id
      nickname
    }
  }
`;

export { GET_USERS, GET_USER };