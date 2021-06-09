import  gql  from 'graphql-tag';

export const USER_FRAGMENT = gql`
    fragment UserObject on User{
        id
        name
        lastname
        email
        password @include(if: $include)
        birthday
        registerDate @include(if: $include)
        role
        active
    }
`;
