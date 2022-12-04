import { gql } from 'apollo-server-express';

const messageSchema = gql`
  type Message {
    id: ID!
    text: String!
    userId: ID!
    timestamp: Float # 13자리 숫자
  }

  extend type Query {
    messages: [Message!]! # GET MESSAGES
    message(id: ID!): Message! # GET MESSAGE
  }

  extend type Mutation {
    createMessage(text: String!, userId: ID!): Message!
    updateMessage(id: ID!, text: String!, userId: ID!): Message!
    deleteMessage(id: ID!, userId: ID!): ID!
  }
`;

export default messageSchema;