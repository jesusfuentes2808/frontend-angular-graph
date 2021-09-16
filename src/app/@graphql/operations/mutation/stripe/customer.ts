import gql from 'graphql-tag';
import {GENRE_FRAGMENT} from '@graphql/operations/fragment/genre';

export  const  CREATE_CUSTOMER_TYPE = gql `
mutation addCustomer($name: String!, $email: String!){
  createCustomer(
    name: $name,
    email: $email
){
    status
    message
    customer{
      id
      email
      description
    }
  }
}
`;
